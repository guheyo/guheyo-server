import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { UsernameResponse } from '@lib/domains/user/application/dtos/username.response';

@ObjectType()
export class OfferPreviewResponse {
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
  source: string;

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field()
  groupId: string;

  @Field()
  productCategoryId: string;

  @Field(() => UsernameResponse)
  seller: UsernameResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  constructor(partial: Partial<OfferPreviewResponse>) {
    Object.assign(this, partial);
  }
}
