import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteThreadArgs } from './delete-thread.args';

export class DeleteThreadCommand implements ICommand {
  id: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteThreadArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.user = user;
  }
}
