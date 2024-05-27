import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BidCountResponse {
  @Field(() => ID)
  auctionId: string;

  @Field(() => Int)
  count: number;
}
