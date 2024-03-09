import { ICommand } from '@nestjs/cqrs';
import { DeleteOfferArgs } from './delete-offer.args';

export class DeleteOfferCommand implements ICommand {
  id: string;

  sellerId: string;

  constructor(args: DeleteOfferArgs) {
    this.id = args.id;
    this.sellerId = args.sellerId;
  }
}
