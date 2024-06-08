import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { AuctionEventService } from '../../services/auction-event/auction-event.service';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { AuctionSavePort } from '../../ports/out/auction.save.port';
import { ReScheduleAuctionEndCommand } from './re-schedule-auction-end.command';
import { parseAuctionUpdatedTriggerName } from '../../subscriptions/auction-updated/parse-auction-updated-trigger-name';
import { UpdatedAuctionResponse } from '../update-auction/updated-auction.response';

@CommandHandler(ReScheduleAuctionEndCommand)
export class ReScheduleAuctionEndHandler extends PrismaCommandHandler<
  ReScheduleAuctionEndCommand,
  UpdatedAuctionResponse
> {
  constructor(
    private readonly auctionEventService: AuctionEventService,
    @Inject('AuctionSavePort') private savePort: AuctionSavePort,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
  ) {
    super(UpdatedAuctionResponse);
  }

  async execute(command: ReScheduleAuctionEndCommand): Promise<void> {
    const auction = await this.loadPort.findById(command.id);
    if (!auction) {
      throw new Error('Auction not found'); // Handle appropriately
    }

    if (auction.isEndWithinLastMinute()) {
      auction.extendEndDateByOneMinute();
      auction.update({
        id: auction.id,
        extendedEndDate: auction.extendedEndDate,
      });
      await this.savePort.save(auction);

      await this.auctionEventService.cancelEndAuctionEvent(auction.id);
      await this.auctionEventService.scheduleEndAuctionEvent(auction.id, auction.extendedEndDate);

      await GraphqlPubSub.publish(parseAuctionUpdatedTriggerName(auction.id), {
        auctionUpdated: {
          id: auction.id,
          updatedAt: auction.updatedAt,
          extendedEndDate: auction.extendedEndDate,
          status: auction.status,
        },
      });
    }
  }
}
