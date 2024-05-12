import { IQuery } from '@nestjs/cqrs';
import { CheckPostsNotExistArgs } from './check-posts-not-exist.args';

export class CheckPostsNotExistQuery implements IQuery {
  ids: string[];

  constructor({ args }: { args: CheckPostsNotExistArgs }) {
    this.ids = args.ids;
  }
}
