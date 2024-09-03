import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class FindUserReviewPreviewsWhereInput {
  // Post
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  tagType?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  tagNames?: string[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  pending?: string;

  // User Review
  @IsOptional()
  @Field(() => ID, { nullable: true })
  reviewedUserId?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };
}
