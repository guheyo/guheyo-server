import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { ReportResponse } from '@lib/domains/report/application/dtos/report.response';

@ObjectType()
export class OfferPreviewResponse {
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

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field()
  groupId: string;

  @Field()
  productCategoryId: string;

  @Field(() => UserResponse)
  seller: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  @Field(() => [ReportResponse])
  reports: ReportResponse[];

  constructor(partial: Partial<OfferPreviewResponse>) {
    Object.assign(this, partial);
  }
}
