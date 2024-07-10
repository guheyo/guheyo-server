import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { BID } from '@lib/domains/auction/domain/bid.constants';
import { PlaceBidCommand } from './place-bid.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidResponse } from '../../dtos/bid.response';
import { parseBidPlacedTriggerName } from '../../subscriptions/bid-placed/parse-bid-placed-trigger-name';

@CommandHandler(PlaceBidCommand)
export class PlaceBidHandler extends PrismaCommandHandler<PlaceBidCommand, BidResponse> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BidResponse);
  }

  async execute(command: PlaceBidCommand): Promise<void> {
    const newBid = await this.retryPlaceBid(command, 3);
    await GraphqlPubSub.publish(parseBidPlacedTriggerName(command.auctionId), {
      bidPlaced: newBid,
    });
  }

  private async retryPlaceBid(command: PlaceBidCommand, retries: number): Promise<BidResponse> {
    try {
      let auction: AuctionEntity | null;
      const bid = await this.prismaService.$transaction(async (prisma) => {
        auction = await this.auctionLoadPort.findById(command.auctionId);
        if (!auction) throw new Error(AuctionErrorMessage.AUCTION_NOT_FOUND);

        auction = this.publisher.mergeObjectContext(new AuctionEntity(auction));

        if (auction.isSeller(command.user.id))
          throw new ForbiddenException(AuctionErrorMessage.BID_FROM_SELLER_ERROR);

        const lastBid = auction.placeBid(command);

        // Update the auction version and extended end date if necessary
        if (auction.isEndWithinLastMinute()) {
          auction.extendEndDateByOneMinute();
        }

        await prisma.auction.update({
          where: {
            id: auction.id,
            version: auction.version,
          },
          data: {
            version: {
              increment: 1,
            },
            extendedEndDate: auction.extendedEndDate,
          },
        });

        const newBid = await prisma.bid.create({
          data: {
            id: lastBid.id,
            auctionId: lastBid.auctionId,
            price: lastBid.price,
            priceCurrency: lastBid.priceCurrency,
            userId: command.user.id,
            status: BID,
            userAgent: lastBid.userAgent,
            ipAddress: lastBid.ipAddress,
          },
          include: {
            user: {
              include: {
                roles: {
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

        return newBid;
      });

      auction!.commit();
      return bid;
    } catch (error: any) {
      if (error.message.includes('Record to update not found')) {
        if (retries > 0) {
          return this.retryPlaceBid(command, retries - 1);
        }
        throw new ForbiddenException(AuctionErrorMessage.PLACE_BID_RETRY_LIMIT_EXCEEDED);
      }
      throw error;
    }
  }
}
