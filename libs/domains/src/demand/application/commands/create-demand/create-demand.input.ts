import { DEMAND_OPEN } from '@lib/domains/demand/domain/demand.constants';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDemandInput {
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
  @Field(() => String, { defaultValue: DEMAND_OPEN })
  status: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field()
  productCategoryId: string;

  @IsUUID()
  @Field(() => ID)
  buyerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;

  @IsString()
  @Field()
  source: string;
}
