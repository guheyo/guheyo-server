import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @ValidateNested()
  @Type(() => CreatePostInput)
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  productId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsNumber()
  @Field(() => Int)
  rating: number;

  @IsString()
  @Field(() => String)
  status: string;
}
