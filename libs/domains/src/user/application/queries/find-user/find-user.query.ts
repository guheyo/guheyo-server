import { IQuery } from '@nestjs/cqrs';
import { FindUserArgs } from './find-user.args';
import { MyUserResponse } from '../../dtos/my-user.response';

export class FindUserQuery implements IQuery {
  id?: string;

  provider?: string;

  socialId?: string;

  username?: string;

  user?: MyUserResponse;

  constructor({ args, user }: { args: FindUserArgs; user?: MyUserResponse }) {
    this.id = args.id;
    this.provider = args.provider;
    this.socialId = args.socialId;
    this.username = args.username;
    this.user = user;
  }
}
