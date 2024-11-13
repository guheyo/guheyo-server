import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoryInput } from '../create-category/create-category.input';

@InputType()
export class CreateGroupInput {
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryInput) // Required for nested validation
  @Field(() => [CreateCategoryInput]) // Specify as an array of CreateCategoryInput
  categories: CreateCategoryInput[];

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  slug: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  icon?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  position?: number;
}
