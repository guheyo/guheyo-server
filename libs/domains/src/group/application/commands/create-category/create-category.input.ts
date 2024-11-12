import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsString()
  @Field()
  type: string;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsNumber()
  @Field(() => Int)
  position: number;
}
