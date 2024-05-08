import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class ReactionCanceledArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  commentId?: string;
}
