import { ICommand } from '@nestjs/cqrs/dist';
import { CommentType } from '@lib/domains/comment/domain/comment.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateCommentInput } from './create-comment.input';

export class CreateCommentCommand implements ICommand {
  id: string;

  type: CommentType;

  refId: string;

  authorId: string;

  content: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateCommentInput; user: MyUserResponse }) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.authorId = input.authorId;
    this.content = input.content;
    this.source = input.source;
    this.user = user;
  }
}
