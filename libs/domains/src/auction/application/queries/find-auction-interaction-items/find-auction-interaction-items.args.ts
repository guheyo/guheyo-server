import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IsOptional } from 'class-validator';
import { FindAuctionInteractionItemsWhereArgs } from './find-auction-interaction-items-where.args';
import { FindAuctionInteractionItemsOrderByArgs } from './find-auction-interaction-items-order-by.args';

@ArgsType()
export class FindAuctionInteractionItemsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindAuctionInteractionItemsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindAuctionInteractionItemsOrderByArgs;
}
