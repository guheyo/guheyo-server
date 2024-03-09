import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateOfferInput {
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
  @IsString()
  @Field(() => String, { nullable: true })
  businessFunction?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;

  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  brandId?: string;

  @IsString()
  @Field()
  source: string;
}
