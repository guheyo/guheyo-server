import { IQuery } from '@nestjs/cqrs';
import { FindCommentArgs } from './find-comment.args';

export class FindCommentQuery implements IQuery {
  id?: string;

  postId?: string;

  constructor(args: FindCommentArgs) {
    this.id = args.id;
    this.postId = args.postId;
  }
}
