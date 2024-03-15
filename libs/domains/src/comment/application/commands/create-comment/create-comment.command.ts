import { ICommand } from '@nestjs/cqrs/dist';
import { CommentType } from '@lib/domains/comment/domain/comment.types';
import { CreateCommentInput } from './create-comment.input';

export class CreateCommentCommand implements ICommand {
  id: string;

  type: CommentType;

  refId: string;

  authorId: string;

  content: string;

  source: string;

  constructor(input: CreateCommentInput) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.authorId = input.authorId;
    this.content = input.content;
    this.source = input.source;
  }
}
