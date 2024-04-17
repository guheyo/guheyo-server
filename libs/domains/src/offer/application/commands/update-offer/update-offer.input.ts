import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class UpdateOfferInput {
  @ValidateNested()
  @Type(() => UpdatePostInput)
  @Field(() => UpdatePostInput)
  post: UpdatePostInput;

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
  status?: string;
}
