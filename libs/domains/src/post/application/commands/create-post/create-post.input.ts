import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

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
  type: string;

  @IsString()
  @Field()
  title: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [ID], { nullable: true })
  tagIds?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  tagNames?: string[];
}
