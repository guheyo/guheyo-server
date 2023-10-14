import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BidResponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  canceledAt: Date;

  @Field(() => Int)
  price: number;

  @Field()
  priceCurrency: string;

  @Field(() => ID)
  auctionId: string;

  @Field(() => UserResponse)
  bidder: UserResponse;

  @Field()
  status: string;
}