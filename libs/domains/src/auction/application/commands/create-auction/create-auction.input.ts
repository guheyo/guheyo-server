import { AUCTION_LIVE } from '@lib/domains/auction/domain/auction.constants';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class CreateAuctionInput {
  @ValidateNested()
  @Type(() => CreatePostInput)
  @Field(() => CreatePostInput)
  post: CreatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsDate()
  @Field(() => Date)
  createdAt: Date;

  @IsDate()
  @Field(() => Date)
  originalEndDate: Date;

  @IsString()
  @Field(() => String)
  content: string;

  @IsNumber()
  @Field(() => Int)
  shippingCost: number;

  @IsString()
  @Field()
  shippingType: string;

  @IsString()
  @Field(() => String, { defaultValue: AUCTION_LIVE })
  status: string;
}
