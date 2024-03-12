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

  @Field()
  businessFunction: string;

  @Field()
  status: string;

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

  constructor(partial: Partial<DemandPreviewResponse>) {
    Object.assign(this, partial);
  }
}
