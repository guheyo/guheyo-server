import { ICommand } from '@nestjs/cqrs/dist';
import { RejectBidsInput } from './reject-bids.input';

export class RejectBidsCommand implements ICommand {
  userId: string;

  constructor({ input }: { input: RejectBidsInput }) {
    this.userId = input.userId;
  }
}
