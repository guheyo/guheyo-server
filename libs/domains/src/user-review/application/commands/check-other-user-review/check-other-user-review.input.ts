import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CheckOtherUserReviewInput {
  @IsUUID()
  @Field(() => ID)
  sourceUserReviewId: string;

  @IsUUID()
  @Field(() => ID)
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
  userId: string;

  @IsUUID()
  @Field(() => ID)
  reviewedUserId: string;

  @IsString()
  @Field(() => String)
  reviewStatus: string;
}
