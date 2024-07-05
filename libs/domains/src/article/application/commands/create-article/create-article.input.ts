import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @ValidateNested()
  @Type(() => CreatePostInput)
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;
}
