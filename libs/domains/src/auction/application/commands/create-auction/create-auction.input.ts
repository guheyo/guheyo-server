import { AUCTION_OPEN } from '@lib/domains/auction/domain/auction.constants';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAuctionInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsDate()
  @Field()
  createdAt: Date;

  @IsDate()
  @Field()
  endedAt: Date;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsString()
  @Field()
  businessFunction: string;

  @IsString()
  @Field(() => String, { defaultValue: AUCTION_OPEN })
  status: string;

  @IsString()
  @Field()
  source: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsUUID()
  @Field()
  productCategoryId: string;

  @IsUUID()
  @Field()
  sellerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;
}
