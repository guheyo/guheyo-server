import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBumpInput } from './create-bump.input';

export class CreateBumpCommand implements ICommand {
  id: string;

  type: string;

  offerId?: string;

  demandId?: string;

  swapId?: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateBumpInput) {
    this.id = input.id;
    this.type = input.type;
    this.offerId = input.offerId;
    this.demandId = input.demandId;
    this.swapId = input.swapId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
