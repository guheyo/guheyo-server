import { IQuery } from '@nestjs/cqrs';
import { FindReactionsArgs } from './find-reactions.args';

export class FindReactionsQuery implements IQuery {
  postId?: string;

  commentId?: string;

  constructor({ args }: { args: FindReactionsArgs }) {
    this.postId = args.postId;
    this.commentId = args.commentId;
  }
}
