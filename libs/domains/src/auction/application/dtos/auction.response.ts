import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { BidResponse } from './bid.response';

@ObjectType()
export class AuctionResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  endedAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

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
  groupId: string;

  @Field()
  productCategoryId: string;

  @Field(() => AuthorResponse)
  seller: AuthorResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field(() => [BidResponse])
  bids: BidResponse[];

  constructor(partial: Partial<AuctionResponse>) {
    Object.assign(this, partial);
  }
}
