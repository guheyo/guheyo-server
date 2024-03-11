import { ICommand } from '@nestjs/cqrs/dist';
import { CreateSwapBumpInput } from './create-swap-bump.input';

export class CreateSwapBumpCommand implements ICommand {
  id: string;

  swapId: string;

  oldPrice: number;

  newPrice: number;

  constructor(input: CreateSwapBumpInput) {
    this.id = input.id;
    this.swapId = input.swapId;
    this.oldPrice = input.oldPrice;
    this.newPrice = input.newPrice;
  }
}
