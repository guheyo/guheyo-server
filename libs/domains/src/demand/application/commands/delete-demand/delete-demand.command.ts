import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteDemandArgs } from './delete-demand.args';

export class DeleteDemandCommand implements ICommand {
  id: string;

  buyerId: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteDemandArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.buyerId = args.buyerId;
    this.user = user;
  }
}
