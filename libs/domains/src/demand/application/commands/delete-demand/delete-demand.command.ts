import { ICommand } from '@nestjs/cqrs';
import { DeleteDemandArgs } from './delete-demand.args';

export class DeleteDemandCommand implements ICommand {
  id: string;

  buyerId: string;

  constructor(args: DeleteDemandArgs) {
    this.id = args.id;
    this.buyerId = args.buyerId;
  }
}
