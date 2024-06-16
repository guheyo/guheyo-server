import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBidInput } from '../create-bid/create-bid.input';
import { CreateBidsInput } from './create-bids.input';

export class CreateBidsCommand implements ICommand {
  bidInputs: CreateBidInput[];

  constructor({ input }: { input: CreateBidsInput }) {
    this.bidInputs = input.bidInputs;
  }
}
