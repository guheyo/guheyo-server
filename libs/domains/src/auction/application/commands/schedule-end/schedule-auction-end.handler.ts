import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuctionEventService } from '../../services/auction-event/auction-event.service';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { AuctionSavePort } from '../../ports/out/auction.save.port';
import { ScheduleAuctionEndCommand } from './schedule-auction-end.command';

@CommandHandler(ScheduleAuctionEndCommand)
export class ScheduleAuctionEndHandler implements ICommandHandler<ScheduleAuctionEndCommand> {
  constructor(
    private readonly auctionEventService: AuctionEventService,
    @Inject('AuctionSavePort') private savePort: AuctionSavePort,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ScheduleAuctionEndCommand): Promise<void> {
    let auction = await this.loadPort.findById(command.id);
    if (!auction) {
      throw new Error('Auction not found'); // Handle appropriately
    }

    auction = this.publisher.mergeObjectContext(auction);
    auction.update({
      id: command.id,
      extendedEndDate: command.extendedEndDate,
    });
    await this.savePort.save(auction);

    await this.auctionEventService.cancelAuctionEndEvent(auction.id);
    await this.auctionEventService.scheduleAuctionEndEvent(auction.id, command.extendedEndDate);
  }
}
