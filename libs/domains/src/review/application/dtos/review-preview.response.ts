import { Field, ObjectType } from '@nestjs/graphql';
import { PostPreviewWithUserResponse } from '@lib/domains/post/application/dtos/post-preview-with-user.response';
import { ProductBaseResponse } from '@lib/domains/product/application/dtos/product-base.response';
import { ReviewBaseResponse } from './review-base.response';

@ObjectType()
export class ReviewPreviewResponse extends ReviewBaseResponse {
  @Field(() => PostPreviewWithUserResponse)
  post: PostPreviewWithUserResponse;

  @Field(() => ProductBaseResponse)
  product: ProductBaseResponse;

  constructor(partial: Partial<ReviewPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
