import { ICommand } from '@nestjs/cqrs/dist';
import { BumpSwapInput } from './bump-swap.input';

export class BumpSwapCommand implements ICommand {
  input: BumpSwapInput;

  constructor(input: BumpSwapInput) {
    this.input = input;
  }
}
