import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';

@ObjectType()
export class SwapResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name0: string;

  @Field()
  name1: string;

  @Field(() => String, { nullable: true })
  description0: string | null;

  @Field(() => String, { nullable: true })
  description1: string | null;

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
  productCategoryId: string;

  @Field(() => ID)
  proposerId: string;

  @Field(() => AuthorResponse)
  proposer: AuthorResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  constructor(partial: Partial<SwapResponse>) {
    Object.assign(this, partial);
  }
}
