import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PlaceBidCommand } from './place-bid.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidSavePort } from '../../ports/out/bid.save.port';

@CommandHandler(PlaceBidCommand)
export class PlaceBidHandler implements ICommandHandler<PlaceBidCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('BidSavePort') private bidSavePort: BidSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: PlaceBidCommand): Promise<void> {
    let auction = await this.auctionLoadPort.findById(command.auctionId);
    if (!auction) throw new Error(AuctionErrorMessage.AUCTION_NOT_FOUND);

    auction = this.publisher.mergeObjectContext(new AuctionEntity(auction));
    await auction.placeBid(command);

    const lastBid = auction.getLastBid();
    if (!lastBid) throw new InternalServerErrorException(AuctionErrorMessage.BID_NOT_ADDED);
    await this.bidSavePort.addBid(lastBid);
  }
}
