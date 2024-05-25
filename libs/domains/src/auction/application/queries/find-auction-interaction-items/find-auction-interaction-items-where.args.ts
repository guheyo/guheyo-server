import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindAuctionInteractionItemsWhereArgs {
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
  type?: string;
}
