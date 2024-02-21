import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UsernameResponse } from '@lib/domains/user/application/dtos/username.response';

@ObjectType()
export class DemandPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

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

  @Field(() => UsernameResponse)
  buyer: UsernameResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  constructor(partial: Partial<DemandPreviewResponse>) {
    Object.assign(this, partial);
  }
}