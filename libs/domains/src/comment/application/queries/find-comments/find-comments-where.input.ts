import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindCommentsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;
}
