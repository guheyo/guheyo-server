import { AUCTION_OPEN } from '@lib/domains/auction/domain/auction.constants';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAuctionInput {
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsDate()
  @Field()
  createdAt: Date;

  @IsDate()
  @Field(() => Date)
  originalEndDate: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsString()
  @Field()
  shippingCost: number;

  @IsOptional()
  @IsString()
  @Field()
  shippingType: string;

  @IsString()
  @Field(() => String, { defaultValue: AUCTION_OPEN })
  status: string;
}
