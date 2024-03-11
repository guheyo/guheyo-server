import { ICommand } from '@nestjs/cqrs/dist';
import { CreateOfferBumpInput } from './create-offer-bump.input';

export class CreateOfferBumpCommand implements ICommand {
  id: string;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateOfferBumpInput) {
    this.id = input.id;
    this.offerId = input.offerId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
