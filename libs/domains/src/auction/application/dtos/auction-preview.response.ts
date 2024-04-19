import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { PostPreviewResponse } from '@lib/domains/post/application/dtos/post-preview.response';

@ObjectType()
export class AuctionPreviewResponse {
  @Field(() => PostPreviewResponse)
  post: PostPreviewResponse;

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  originalEndDate: Date;

  @Field(() => Date)
  extendedEndDate: Date;

  @Field(() => Int)
  extensionCount: number;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Int)
  currentBidPrice: Number;

  @Field(() => Int)
  hammerPrice: Number;

  @Field(() => Int)
  shippingCost: Number;

  @Field()
  shippingType: string;

  @Field()
  status: string;

  constructor(partial: Partial<AuctionPreviewResponse>) {
    Object.assign(this, partial);
  }
}
