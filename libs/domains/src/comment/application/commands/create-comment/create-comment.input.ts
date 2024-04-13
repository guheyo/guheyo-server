import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  postId: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field(() => String)
  content: string;
}
