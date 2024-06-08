import { ICommand } from '@nestjs/cqrs/dist';
import { ScheduleAuctionEndInput } from './schedule-auction-end.input';

export class ScheduleAuctionEndCommand implements ICommand {
  id: string;

  extendedEndDate: Date;

  constructor({ input }: { input: ScheduleAuctionEndInput }) {
    this.id = input.id;
    this.extendedEndDate = input.extendedEndDate;
  }
}
