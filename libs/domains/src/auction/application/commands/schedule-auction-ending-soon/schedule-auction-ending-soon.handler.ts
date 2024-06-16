import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { ScheduleAuctionEndingSoonCommand } from './schedule-auction-ending-soon.command';
import { AuctionEndingSoonEventService } from '../../services/auction-ending-soon-event/auction-ending-soon-event.service';

@CommandHandler(ScheduleAuctionEndingSoonCommand)
export class ScheduleAuctionEndingSoonHandler
  implements ICommandHandler<ScheduleAuctionEndingSoonCommand>
{
  constructor(
    private readonly auctionEndingSoonEventService: AuctionEndingSoonEventService,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
  ) {}

  async execute(command: ScheduleAuctionEndingSoonCommand): Promise<void> {
    const auction = await this.loadPort.findById(command.id);
    if (!auction) {
      throw new Error('Auction not found'); // Handle appropriately
    }

    await this.auctionEndingSoonEventService.scheduleAuctionEndingSoonEvent(
      auction.id,
      command.extendedEndDate,
    );
  }
}
