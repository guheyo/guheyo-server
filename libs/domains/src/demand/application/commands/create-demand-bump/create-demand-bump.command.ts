import { ICommand } from '@nestjs/cqrs/dist';
import { CreateDemandBumpInput } from './create-demand-bump.input';

export class CreateDemandBumpCommand implements ICommand {
  id: string;

  demandId: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateDemandBumpInput) {
    this.id = input.id;
    this.demandId = input.demandId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
