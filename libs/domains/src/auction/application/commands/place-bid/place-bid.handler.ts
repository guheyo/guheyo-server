import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, InternalServerErrorException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { PlaceBidCommand } from './place-bid.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidSavePort } from '../../ports/out/bid.save.port';
import { BidResponse } from '../../dtos/bid.response';
import { parseBidPlacedTriggerName } from '../../subscriptions/bid-placed/parse-bid-placed-trigger-name';

@CommandHandler(PlaceBidCommand)
export class PlaceBidHandler extends PrismaCommandHandler<PlaceBidCommand, BidResponse> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('BidSavePort') private bidSavePort: BidSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(BidResponse);
  }

  async execute(command: PlaceBidCommand): Promise<void> {
    let auction = await this.auctionLoadPort.findById(command.auctionId);
    if (!auction) throw new Error(AuctionErrorMessage.AUCTION_NOT_FOUND);

    auction = this.publisher.mergeObjectContext(new AuctionEntity(auction));
    const lastBid = auction.placeBid(command);
    if (!lastBid) throw new InternalServerErrorException(AuctionErrorMessage.BID_NOT_ADDED);
    await this.bidSavePort.addBid(lastBid);

    const newBid = await this.prismaService.bid.findUnique({
      where: {
        id: lastBid.id,
      },
      include: {
        user: {
          include: {
            roles: {
              include: {
                group: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    if (!newBid) throw new ForbiddenException(AuctionErrorMessage.BID_CREATION_FAILED);

    await GraphqlPubSub.publish(parseBidPlacedTriggerName(auction.id), {
      bidPlaced: newBid,
    });
  }
}
