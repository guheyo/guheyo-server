import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CommentDeletedArgs {
  @IsUUID()
  @Field(() => ID)
  postId: string;
}
