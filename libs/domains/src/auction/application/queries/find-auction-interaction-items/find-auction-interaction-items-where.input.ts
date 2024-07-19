import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindAuctionInteractionItemsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  auctionId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  view?: string;
}
