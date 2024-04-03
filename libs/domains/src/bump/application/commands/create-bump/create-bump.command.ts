import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBumpInput } from './create-bump.input';

export class CreateBumpCommand implements ICommand {
  id: string;

  type: string;

  refId: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateBumpInput) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
