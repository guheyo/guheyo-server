import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';

@ObjectType()
export class DemandPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  bumpedAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

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
  businessFunction: string;

  @Field()
  status: string;

  @Field(() => Boolean)
  isHidden: boolean;

  @Field(() => String, { nullable: true })
  pending: string | null;

  @Field()
  groupId: string;

  @Field()
  productCategoryId: string;

  @Field(() => UserResponse)
  buyer: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  @Field(() => Int)
  reportCount: number;

  @Field(() => Int)
  reportCommentCount: number;

  constructor(partial: Partial<DemandPreviewResponse>) {
    Object.assign(this, partial);
  }
}
