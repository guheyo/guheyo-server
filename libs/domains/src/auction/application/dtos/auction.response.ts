import { Field, ObjectType } from '@nestjs/graphql';
import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { AuctionPreviewResponse } from './auction-preview.response';

@ObjectType()
export class AuctionResponse extends AuctionPreviewResponse {
  @Field(() => PostResponse)
  declare post: PostResponse;

  constructor(partial: Partial<AuctionResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
