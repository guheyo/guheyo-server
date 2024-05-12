import { IQuery } from '@nestjs/cqrs';
import { CheckPostsNotExistArgs } from './check-posts-not-exist.args';

export class CheckPostsNotExistQuery implements IQuery {
  postIds: string[];

  constructor({ args }: { args: CheckPostsNotExistArgs }) {
    this.postIds = args.postIds;
  }
}
