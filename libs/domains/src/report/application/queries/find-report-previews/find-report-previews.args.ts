import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IsOptional } from 'class-validator';
import { FindReportPreviewsWhereArgs } from './find-report-previews-where.args';
import { FindReportPreviewsOrderByArgs } from './find-report-previews.order-by.args';

@ArgsType()
export class FindReportPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindReportPreviewsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindReportPreviewsOrderByArgs;
}
