import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteArticleArgs } from './delete-article.args';

export class DeleteArticleCommand implements ICommand {
  id: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteArticleArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.user = user;
  }
}
