import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindCommentsWhereArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;
}
