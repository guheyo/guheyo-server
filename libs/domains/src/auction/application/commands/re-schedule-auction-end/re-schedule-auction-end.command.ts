import { ICommand } from '@nestjs/cqrs/dist';
import { ReScheduleAuctionEndInput } from './re-schedule-auction-end.input';

export class ReScheduleAuctionEndCommand implements ICommand {
  id: string;

  extendedEndDate: Date;

  constructor({ input }: { input: ReScheduleAuctionEndInput }) {
    this.id = input.id;
    this.extendedEndDate = input.extendedEndDate;
  }
}
