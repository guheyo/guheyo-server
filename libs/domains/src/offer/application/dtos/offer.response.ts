import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { ProductCategoryResponse } from '@lib/domains/group/application/dtos/product-category.response';

@ObjectType()
export class OfferResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  bumpedAt: Date;

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

  @Field(() => Int)
  shippingCost: Number;

  @Field()
  shippingType: string;

  @Field(() => Int)
  totalPrice: number;

  @Field()
  businessFunction: string;

  @Field()
  status: string;

  @Field(() => Boolean)
  isHidden: boolean;

  @Field(() => String, { nullable: true })
  pending: string | null;

  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field(() => ProductCategoryResponse)
  productCategory: ProductCategoryResponse;

  @Field(() => AuthorResponse)
  seller: AuthorResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  @Field(() => Int)
  reportCount: number;

  @Field(() => Int)
  reportCommentCount: number;

  constructor(partial: Partial<OfferResponse>) {
    Object.assign(this, partial);
  }
}
