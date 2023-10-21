import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, ID, GraphQLISODateTime, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { BidResponse } from './bid.response';

@ObjectType()
export class AuctionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  endedAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int)
  price: number;

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

  @Field(() => UserResponse)
  seller: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field(() => [BidResponse])
  bids: BidResponse[];

  constructor(partial: Partial<AuctionResponse>) {
    Object.assign(this, partial);
  }
}
