import { Field, ObjectType } from '@nestjs/graphql';
import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { ReviewPreviewResponse } from './review-preview.response';

@ObjectType()
export class ReviewDetailResponse extends ReviewPreviewResponse {
  @Field(() => PostResponse)
  declare post: PostResponse;

  constructor(partial: Partial<ReviewDetailResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
