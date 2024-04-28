import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindUserReviewPreviewsWhereArgs {
  // Post
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  pending?: string;
}
