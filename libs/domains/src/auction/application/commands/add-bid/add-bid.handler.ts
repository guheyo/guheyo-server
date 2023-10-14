import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { AddBidCommand } from './add-bid.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidSavePort } from '../../ports/out/bid.save.port';

@CommandHandler(AddBidCommand)
export class AddBidHandler implements ICommandHandler<AddBidCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('BidSavePort') private bidSavePort: BidSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddBidCommand): Promise<void> {
    let auction = await this.auctionLoadPort.findById(command.auctionId);
    if (!auction) throw new Error(AuctionErrorMessage.AUCTION_IS_NOT_FOUND);
    auction = this.publisher.mergeObjectContext(new AuctionEntity(auction));
    await auction.addBid(command);
    await this.bidSavePort.addBid(auction.getLastBid());
  }
}
