import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { CommentResponse } from './comment.response';

@ObjectType()
export class CommentWithAuthorResponse extends CommentResponse {
  @Field(() => AuthorResponse)
  user: AuthorResponse;

  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  constructor(partial: Partial<CommentWithAuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
