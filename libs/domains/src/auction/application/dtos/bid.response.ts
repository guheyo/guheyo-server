import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
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

  @Field(() => AuthorResponse)
  bidder: AuthorResponse;

  @Field()
  status: string;
}
