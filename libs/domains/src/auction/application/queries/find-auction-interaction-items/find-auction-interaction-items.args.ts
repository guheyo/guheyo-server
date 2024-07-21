import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindAuctionInteractionItemsOrderByInput } from './find-auction-interaction-items-order-by.input';
import { FindAuctionInteractionItemsWhereInput } from './find-auction-interaction-items-where.input';

@ArgsType()
export class FindAuctionInteractionItemsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuctionInteractionItemsWhereInput)
  @Field(() => FindAuctionInteractionItemsWhereInput, { nullable: true })
  where?: FindAuctionInteractionItemsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuctionInteractionItemsOrderByInput)
  @Field(() => FindAuctionInteractionItemsOrderByInput, { nullable: true })
  orderBy?: FindAuctionInteractionItemsOrderByInput;
}
