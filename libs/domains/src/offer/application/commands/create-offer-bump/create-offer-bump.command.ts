import { ICommand } from '@nestjs/cqrs/dist';
import { CreateOfferBumpInput } from './create-offer-bump.input';

export class CreateOfferBumpCommand implements ICommand {
  id: string;

  offerId: string;

  oldData?: any;

  newData?: any;

  constructor(input: CreateOfferBumpInput) {
    this.id = input.id;
    this.offerId = input.offerId;
    this.oldData = input.oldData;
    this.newData = input.newData;
  }
}
