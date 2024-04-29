import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
