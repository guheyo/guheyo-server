import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBumpInput } from './create-bump.input';

export class CreateBumpCommand implements ICommand {
  id: string;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateBumpInput) {
    this.id = input.id;
    this.offerId = input.offerId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
