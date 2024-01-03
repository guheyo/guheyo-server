import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BidResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
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

  @Field()
  source: string;
}
