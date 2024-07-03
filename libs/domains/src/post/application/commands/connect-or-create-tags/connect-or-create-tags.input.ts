import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ConnectOrCreateTagsInput {
  @IsUUID()
  @Field(() => ID)
  postId: string;

  @Field()
  type: string;

  @Field(() => [String])
  tagNames: string[];
}
