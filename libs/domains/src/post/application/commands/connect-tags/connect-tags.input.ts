import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ConnectTagsInput {
  @IsUUID()
  @Field(() => ID)
  postId: string;

  @Field(() => [String])
  tagIds: string[];
}
