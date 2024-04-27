import { PostPreviewWithUserResponse } from '@lib/domains/post/application/dtos/post-preview-with-user.response';
import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class OfferPreviewResponse {
  @Field(() => PostPreviewWithUserResponse)
  post: PostPreviewWithUserResponse;

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  bumpedAt: Date;

  @Field()
  businessFunction: string;

  @Field(() => String, { nullable: true })
  name0: string | null;

  @Field(() => String, { nullable: true })
  name1: string | null;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Int)
  price: Number;

  @Field()
  priceCurrency: string;

  @Field(() => Int)
  shippingCost: Number;

  @Field()
  shippingType: string;

  @Field(() => Int)
  totalPrice: number;

  @Field()
  status: string;

  @Field(() => Boolean, { nullable: true })
  hasSubmittedReview?: boolean;

  constructor(partial: Partial<OfferPreviewResponse>) {
    Object.assign(this, partial);
  }
}
