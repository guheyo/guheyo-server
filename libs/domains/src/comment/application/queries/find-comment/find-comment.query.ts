import { IQuery } from '@nestjs/cqrs';
import { FindCommentArgs } from './find-comment.args';

export class FindCommentQuery implements IQuery {
  id?: string;

  type?: string;

  postId?: string;

  reportId?: string;

  auctionId?: string;

  constructor(args: FindCommentArgs) {
    this.id = args.id;
    this.type = args.type;
    this.postId = args.postId;
    this.reportId = args.reportId;
    this.auctionId = args.auctionId;
  }
}
