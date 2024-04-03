import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsString()
  @Field(() => String)
  content: string;

  @IsString()
  @Field(() => String)
  source: string;
}
