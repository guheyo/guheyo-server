import { OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateOfferInput {
  @ValidateNested()
  @Type(() => CreatePostInput)
  @Field(() => CreatePostInput)
  post: CreatePostInput;

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
  businessFunction: string;

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
  content?: string;

  @IsNumber()
  @Field(() => Int)
  price: number;

  @IsString()
  @Field()
  priceCurrency: string;

  @IsNumber()
  @Field(() => Int)
  shippingCost: number;

  @IsString()
  @Field()
  shippingType: string;

  @IsString()
  @Field(() => String, { defaultValue: OFFER_OPEN })
  status: string;
}
