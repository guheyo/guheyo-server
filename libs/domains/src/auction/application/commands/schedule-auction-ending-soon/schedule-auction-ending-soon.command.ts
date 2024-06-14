import { ICommand } from '@nestjs/cqrs/dist';
import { ScheduleAuctionEndingSoonInput } from './schedule-auction-ending-soon.input';

export class ScheduleAuctionEndingSoonCommand implements ICommand {
  id: string;

  extendedEndDate: Date;

  constructor({ input }: { input: ScheduleAuctionEndingSoonInput }) {
    this.id = input.id;
    this.extendedEndDate = input.extendedEndDate;
  }
}
