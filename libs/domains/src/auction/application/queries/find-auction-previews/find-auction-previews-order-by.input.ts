import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindAuctionPreviewsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  extendedEndDate?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  currentBidPrice?: 'asc' | 'desc';
}
