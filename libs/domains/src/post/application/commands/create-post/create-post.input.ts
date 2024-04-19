import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  type: string;

  @IsString()
  @Field()
  title: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field(() => ID)
  categoryId: string;

  @IsString({ each: true })
  @Field(() => [String])
  tagIds: string[];
}
