import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateCommentInput } from './update-comment.input';

export class UpdateCommentCommand implements ICommand {
  id: string;

  authorId: string;

  content: string;

  source: string;

  constructor(input: UpdateCommentInput) {
    this.id = input.id;
    this.authorId = input.authorId;
    this.content = input.content;
    this.source = input.source;
  }
}
