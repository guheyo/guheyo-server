import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  type: string;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field(() => ID)
  categoryId: string;

  @Field(() => [String])
  tagIds: string[];
}
