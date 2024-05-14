import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindAuctionOrderByArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  currentBidPrice?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  extendedEndDate?: 'asc' | 'desc';
}
