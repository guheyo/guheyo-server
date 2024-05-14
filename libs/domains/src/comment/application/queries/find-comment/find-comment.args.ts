import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class FindCommentArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  postId?: string;
}
