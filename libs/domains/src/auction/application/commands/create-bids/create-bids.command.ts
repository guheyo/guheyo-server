import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBidCommand } from '../create-bid/create-bid.command';

export class CreateBidsCommand implements ICommand {
  constructor(public readonly bidCommands: CreateBidCommand[]) {}
}
