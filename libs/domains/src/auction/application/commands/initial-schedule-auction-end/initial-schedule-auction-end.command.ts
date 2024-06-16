import { ICommand } from '@nestjs/cqrs/dist';
import { InitialScheduleAuctionEndInput } from './initial-schedule-auction-end.input';

export class InitialScheduleAuctionEndCommand implements ICommand {
  id: string;

  extendedEndDate: Date;

  constructor({ input }: { input: InitialScheduleAuctionEndInput }) {
    this.id = input.id;
    this.extendedEndDate = input.extendedEndDate;
  }
}
