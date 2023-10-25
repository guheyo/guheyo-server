import { Field, ID, GraphQLISODateTime, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { UserWithMembersResponse } from '@lib/domains/user/application/dtos/user-with-members';

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

  @Field()
  source: string;

  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field()
  guildId: string;

  @Field()
  productCategoryId: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => UserWithMembersResponse)
  seller: UserWithMembersResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  constructor(partial: Partial<OfferResponse>) {
    Object.assign(this, partial);
  }
}
