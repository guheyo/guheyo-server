import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateSwapInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name0?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name1?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description0?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description1?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  price?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  priceCurrency?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  shippingCost?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  shippingType?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  businessFunction?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;

  @IsUUID()
  @Field(() => ID)
  proposerId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  hidden?: boolean;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;

  @IsString()
  @Field()
  source: string;
}
