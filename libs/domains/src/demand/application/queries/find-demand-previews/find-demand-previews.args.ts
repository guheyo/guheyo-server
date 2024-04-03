import { FindOffersOrderByArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-order-by.args';
import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { FindDemandsWhereArgs } from './find-demands-where.args';

@ArgsType()
export class FindDemandPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindDemandsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindOffersOrderByArgs;
}
