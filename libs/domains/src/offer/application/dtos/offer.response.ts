import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { OfferPreviewResponse } from './offer-preview.response';

@ObjectType()
export class OfferResponse extends OfferPreviewResponse {
  @Field(() => PostResponse)
  post: PostResponse;

  constructor(partial: Partial<OfferResponse>) {
    super(partial);
    Object.assign(this, partial);
    this.post = new PostResponse(partial.post!);
  }
}
