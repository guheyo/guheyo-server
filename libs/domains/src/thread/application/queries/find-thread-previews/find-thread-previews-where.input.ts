import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindThreadPreviewsWhereInput {
  // Post
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  categoryType?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  pending?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  tagNames?: string[];
}
