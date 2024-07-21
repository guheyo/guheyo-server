import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindAuctionPreviewsWhereInput } from './find-auction-previews-where.input';
import { FindAuctionPreviewsOrderByInput } from './find-auction-previews-order-by.input';

@ArgsType()
export class FindAuctionPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuctionPreviewsWhereInput)
  @Field(() => FindAuctionPreviewsWhereInput, { nullable: true })
  where?: FindAuctionPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuctionPreviewsOrderByInput)
  @Field(() => FindAuctionPreviewsOrderByInput, { nullable: true })
  orderBy?: FindAuctionPreviewsOrderByInput;
}
