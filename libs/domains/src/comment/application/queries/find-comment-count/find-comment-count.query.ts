import { IQuery } from '@nestjs/cqrs';
import { FindCommentCountArgs } from './find-comment-count.args';

export class FindCommentCountQuery implements IQuery {
  postId: string;

  constructor(args: FindCommentCountArgs) {
    this.postId = args.postId;
  }
}
