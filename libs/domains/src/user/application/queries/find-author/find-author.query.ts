import { IQuery } from '@nestjs/cqrs';
import { FindAuthorArgs } from './find-author.args';

export class FindAuthorQuery implements IQuery {
  id?: string;

  username?: string;

  provider?: string;

  socialId?: string;

  constructor(args: FindAuthorArgs) {
    this.id = args.id;
    this.username = args.username;
    this.provider = args.provider;
    this.socialId = args.socialId;
  }
}
