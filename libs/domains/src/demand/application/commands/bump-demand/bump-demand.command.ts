import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { BumpDemandInput } from './bump-demand.input';

export class BumpDemandCommand implements ICommand {
  input: BumpDemandInput;

  user: MyUserResponse;

  constructor({ input, user }: { input: BumpDemandInput; user: MyUserResponse }) {
    this.input = input;
    this.user = user;
  }
}
