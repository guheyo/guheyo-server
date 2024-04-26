import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { USER_REVIEW_ONE_WAY } from '@lib/domains/user-review/domain/user-review.constants';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateUserReviewInput {
  @ValidateNested()
  @Type(() => CreatePostInput)
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  reviewedUserId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  offerId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  auctionId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsNumber()
  @Field(() => Int)
  rating: number;

  @IsString()
  @Field(() => String, { defaultValue: USER_REVIEW_ONE_WAY })
  status: string;
}
