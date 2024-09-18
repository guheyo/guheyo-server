import { IQuery } from '@nestjs/cqrs';
import { FindAuthorArgs } from './find-author.args';
import { MyUserResponse } from '../../dtos/my-user.response';

export class FindAuthorQuery implements IQuery {
  id?: string;

  username?: string;

  user?: MyUserResponse;

  constructor({ args, user }: { args: FindAuthorArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.username = args.username;
    this.user = user;
  }
}
