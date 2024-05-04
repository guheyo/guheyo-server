import { Field, ObjectType } from '@nestjs/graphql';
import { PostWithReactionsResponse } from '@lib/domains/post/application/dtos/post-with-reactions.response';
import { UserReviewPreviewResponse } from './user-review-preview.response';

@ObjectType()
export class UserReviewResponse extends UserReviewPreviewResponse {
  @Field(() => PostWithReactionsResponse)
  declare post: PostWithReactionsResponse;

  constructor(partial: Partial<UserReviewPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
