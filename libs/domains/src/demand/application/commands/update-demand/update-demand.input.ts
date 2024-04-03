import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateDemandInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

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
  buyerId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isHidden?: boolean;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  brandId?: string;

  @IsString()
  @Field()
  source: string;
}
