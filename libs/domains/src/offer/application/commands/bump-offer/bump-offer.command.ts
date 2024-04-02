import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { BumpOfferInput } from './bump-offer.input';

export class BumpOfferCommand implements ICommand {
  input: BumpOfferInput;

  user: MyUserResponse;

  constructor({ input, user }: { input: BumpOfferInput; user: MyUserResponse }) {
    this.input = input;
    this.user = user;
  }
}
