import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectBidsCommand } from './reject-bids.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { BidSavePort } from '../../ports/out/bid.save.port';

@CommandHandler(RejectBidsCommand)
export class RejectBidsHandler implements ICommandHandler<RejectBidsCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('BidSavePort') private bidSavePort: BidSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RejectBidsCommand): Promise<void> {
    await this.bidSavePort.rejectBids(command.userId);
  }
}
