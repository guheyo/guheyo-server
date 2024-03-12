import { ICommand } from '@nestjs/cqrs/dist';
import { BumpOfferInput } from './bump-offer.input';

export class BumpOfferCommand implements ICommand {
  input: BumpOfferInput;

  constructor(input: BumpOfferInput) {
    this.input = input;
  }
}
