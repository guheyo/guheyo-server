import { ICommand } from '@nestjs/cqrs';
import { DeleteSwapArgs } from './delete-swap.args';

export class DeleteSwapCommand implements ICommand {
  id: string;

  proposerId: string;

  constructor(args: DeleteSwapArgs) {
    this.id = args.id;
    this.proposerId = args.proposerId;
  }
}
