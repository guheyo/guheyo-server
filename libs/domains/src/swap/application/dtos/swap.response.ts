import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { ReportWithAuthorResponse } from '@lib/domains/report/application/dtos/report-with-author.response';

@ObjectType()
export class SwapResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  bumpedAt: Date;

  @Field(() => String, { nullable: true })
  slug: string | null;

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

  @Field(() => UserImageResponse, { nullable: true })
  thumbnail: UserImageResponse | null;

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field()
  productCategoryId: string;

  @Field(() => AuthorResponse)
  proposer: AuthorResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  @Field(() => [ReportWithAuthorResponse])
  reports: ReportWithAuthorResponse[];

  constructor(partial: Partial<SwapResponse>) {
    Object.assign(this, partial);
  }
}
