import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserReviewPreviewResponse } from './user-review-preview.response';

@ObjectType()
export class UserReviewResponse extends UserReviewPreviewResponse {
  @Field(() => PostResponse)
  declare post: PostResponse;

  constructor(partial: Partial<UserReviewPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
