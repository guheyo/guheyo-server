import { IQuery } from '@nestjs/cqrs';
import { FindCommentArgs } from './find-comment.args';

export class FindCommentQuery implements IQuery {
  id?: string;

  type?: string;

  refId?: string;

  constructor(args: FindCommentArgs) {
    this.id = args.id;
    this.type = args.type;
    this.refId = args.refId;
  }
}
