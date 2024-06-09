import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EndAuctionEventService } from '../../services/end-auction-event/end-auction-event.service';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { InitialScheduleAuctionEndCommand } from './initial-schedule-auction-end.command';

@CommandHandler(InitialScheduleAuctionEndCommand)
export class InitialScheduleAuctionEndHandler
  implements ICommandHandler<InitialScheduleAuctionEndCommand>
{
  constructor(
    private readonly auctionEventService: EndAuctionEventService,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
  ) {}

  async execute(command: InitialScheduleAuctionEndCommand): Promise<void> {
    const auction = await this.loadPort.findById(command.id);
    if (!auction) {
      throw new Error('Auction not found'); // Handle appropriately
    }

    await this.auctionEventService.scheduleEndAuctionEvent(auction.id, command.extendedEndDate);
  }
}
