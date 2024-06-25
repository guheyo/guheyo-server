import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { PostPreviewWithUserResponse } from '@lib/domains/post/application/dtos/post-preview-with-user.response';

@ObjectType()
export class AuctionPreviewResponse {
  @Field(() => PostPreviewWithUserResponse)
  post: PostPreviewWithUserResponse;

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  originalEndDate: Date;

  @Field(() => Date)
  extendedEndDate: Date;

  @Field(() => Int)
  version: number;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Int, { nullable: true })
  currentBidPrice?: Number;

  @Field(() => Int)
  hammerPrice: Number;

  @Field(() => Int)
  shippingCost: Number;

  @Field()
  shippingType: string;

  @Field()
  status: string;

  @Field(() => Boolean, { nullable: true })
  hasSubmittedReview?: boolean;

  constructor(partial: Partial<AuctionPreviewResponse>) {
    Object.assign(this, partial);
  }
}
