import { IQuery } from '@nestjs/cqrs';
import { FindMyUserArgs } from './find-my-user.args';

export class FindMyUserQuery implements IQuery {
  id?: string;

  username?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindMyUserArgs; userId?: string }) {
    this.id = args.id;
    this.username = args.username;
    this.userId = userId;
  }
}
