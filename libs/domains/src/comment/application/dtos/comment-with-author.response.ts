import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommentResponse } from './comment.response';

@ObjectType()
export class CommentWithAuthorResponse extends CommentResponse {
  @Field(() => AuthorResponse)
  user: AuthorResponse;

  constructor(partial: Partial<CommentWithAuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
