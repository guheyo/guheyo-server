import { OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOfferInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsInt()
  @Field(() => Int)
  price: number;

  @IsString()
  @Field()
  priceCurrency: string;

  @IsInt()
  @Field(() => Int)
  shippingCost: number;

  @IsString()
  @Field()
  shippingType: string;

  @IsString()
  @Field()
  businessFunction: string;

  @IsString()
  @Field(() => String, { defaultValue: OFFER_OPEN })
  status: string;

  @IsString()
  @Field()
  source: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field()
  productCategoryId: string;

  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;
}
