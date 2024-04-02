import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { BumpSwapInput } from './bump-swap.input';

export class BumpSwapCommand implements ICommand {
  input: BumpSwapInput;

  user: MyUserResponse;

  constructor({ input, user }: { input: BumpSwapInput; user: MyUserResponse }) {
    this.input = input;
    this.user = user;
  }
}
