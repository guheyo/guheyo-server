import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';

@ObjectType()
export class OfferResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

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

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field()
  guildId: string;

  @Field()
  productCategoryId: string;

  @Field(() => AuthorResponse)
  seller: AuthorResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  constructor(partial: Partial<OfferResponse>) {
    Object.assign(this, partial);
  }
}
