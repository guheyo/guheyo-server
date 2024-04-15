import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserReviewInput {
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  offerId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  auctionId?: string;

  @IsUUID()
  @Field(() => ID)
  reviewedUserId: string;

  @IsNumber()
  @Field()
  rating: number;
}
