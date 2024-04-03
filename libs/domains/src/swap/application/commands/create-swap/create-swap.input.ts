import { SWAP_OPEN } from '@lib/domains/swap/domain/swap.constants';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSwapInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name0: string;

  @IsString()
  @Field()
  name1: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description0?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description1?: string;

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
  @Field(() => String, { defaultValue: SWAP_OPEN })
  status: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field()
  productCategoryId: string;

  @IsUUID()
  @Field(() => ID)
  proposerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;

  @IsString()
  @Field()
  source: string;
}
