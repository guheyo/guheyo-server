import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IsOptional } from 'class-validator';
import { FindReportsWhereArgs } from './find-reports-where.args';
import { FindReportsOrderByArgs } from './find-reports.order-by.args';

@ArgsType()
export class FindReportsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindReportsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindReportsOrderByArgs;
}
