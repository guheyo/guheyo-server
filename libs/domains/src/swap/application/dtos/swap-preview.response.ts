import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';

@ObjectType()
export class SwapPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  bumpedAt: Date;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field()
  name0: string;

  @Field()
  name1: string;

  @Field(() => Int)
  price: Number;

  @Field()
  priceCurrency: string;

  @Field()
  businessFunction: string;

  @Field()
  status: string;

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field()
  groupId: string;

  @Field()
  productCategoryId: string;

  @Field(() => UserResponse)
  proposer: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  constructor(partial: Partial<SwapPreviewResponse>) {
    Object.assign(this, partial);
  }
}
