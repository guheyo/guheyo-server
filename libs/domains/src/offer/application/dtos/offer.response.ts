import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, ID, GraphQLISODateTime, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';

@ObjectType()
export class OfferResponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int)
  price: Number;

  @Field()
  priceCurrency: string;

  @Field()
  businessFunction: string;

  @Field()
  status: string;

  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field()
  guildId: string;

  @Field()
  productCategoryId: String;

  @Field(() => ID)
  sellerId: string;

  @Field(() => UserResponse)
  seller: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  constructor(partial: Partial<OfferResponse>) {
    Object.assign(this, partial);
  }
}
