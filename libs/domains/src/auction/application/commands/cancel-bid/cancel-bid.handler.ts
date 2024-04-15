import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { CancelBidCommand } from './cancel-bid.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidSavePort } from '../../ports/out/bid.save.port';

@CommandHandler(CancelBidCommand)
export class CancelBidHandler implements ICommandHandler<CancelBidCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('BidSavePort') private bidSavePort: BidSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CancelBidCommand): Promise<void> {
    let auction = await this.auctionLoadPort.findById(command.auctionId);
    if (!auction) throw new Error(AuctionErrorMessage.AUCTION_NOT_FOUND);
    auction = this.publisher.mergeObjectContext(new AuctionEntity(auction));
    const bid = auction.cancelBid(command);
    await this.bidSavePort.cancelBid(bid);
  }
}
