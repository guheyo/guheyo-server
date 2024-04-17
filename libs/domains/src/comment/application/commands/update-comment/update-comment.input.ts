import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field(() => String)
  content: string;
}
