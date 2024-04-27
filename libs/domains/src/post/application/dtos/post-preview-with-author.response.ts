import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { PostPreviewWithoutUserResponse } from './post-preview-without-user.response';

@ObjectType()
export class PostPreviewWithAuthorResponse extends PostPreviewWithoutUserResponse {
  @Field(() => AuthorResponse)
  user: AuthorResponse;

  constructor(partial: Partial<PostPreviewWithAuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
