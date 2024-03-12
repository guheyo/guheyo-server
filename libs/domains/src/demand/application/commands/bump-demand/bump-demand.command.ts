import { ICommand } from '@nestjs/cqrs/dist';
import { BumpDemandInput } from './bump-demand.input';

export class BumpDemandCommand implements ICommand {
  input: BumpDemandInput;

  constructor(input: BumpDemandInput) {
    this.input = input;
  }
}
