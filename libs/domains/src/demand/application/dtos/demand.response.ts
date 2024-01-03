import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';

@ObjectType()
export class DemandResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

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

  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field()
  guildId: string;

  @Field()
  productCategoryId: string;

  @Field(() => ID)
  buyerId: string;

  @Field(() => UserResponse)
  buyer: UserResponse;

  @Field(() => String, { nullable: true })
  brandId: string | null;

  @Field()
  source: string;

  constructor(partial: Partial<DemandResponse>) {
    Object.assign(this, partial);
  }
}
