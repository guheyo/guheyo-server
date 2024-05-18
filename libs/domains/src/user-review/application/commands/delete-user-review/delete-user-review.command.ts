import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteUserReviewArgs } from './delete-user-review.args';

export class DeleteUserReviewCommand implements ICommand {
  id: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteUserReviewArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.user = user;
  }
}
