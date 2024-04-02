import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteSwapArgs } from './delete-swap.args';

export class DeleteSwapCommand implements ICommand {
  id: string;

  proposerId: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteSwapArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.proposerId = args.proposerId;
    this.user = user;
  }
}
