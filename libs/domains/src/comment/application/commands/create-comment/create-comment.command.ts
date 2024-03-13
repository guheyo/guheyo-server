import { ICommand } from '@nestjs/cqrs/dist';
import { CreateCommentInput } from './create-comment.input';

export class CreateCommentCommand implements ICommand {
  id: string;

  type: string;

  source: string;

  authorId: string;

  parentId?: string;

  postId?: string;

  reportId?: string;

  auctionId?: string;

  content: string;

  constructor(input: CreateCommentInput) {
    this.id = input.id;
    this.type = input.type;
    this.source = input.source;
    this.authorId = input.authorId;
    this.parentId = input.parentId;
    this.postId = input.postId;
    this.reportId = input.reportId;
    this.auctionId = input.auctionId;
    this.content = input.content;
  }
}
