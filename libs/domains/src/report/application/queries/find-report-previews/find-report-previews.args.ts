import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindReportPreviewsWhereInput } from './find-report-previews-where.input';
import { FindReportPreviewsOrderByInput } from './find-report-previews-order-by.input';

@ArgsType()
export class FindReportPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindReportPreviewsWhereInput)
  @Field(() => FindReportPreviewsWhereInput, { nullable: true })
  where?: FindReportPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindReportPreviewsOrderByInput)
  @Field(() => FindReportPreviewsOrderByInput, { nullable: true })
  orderBy?: FindReportPreviewsOrderByInput;
}
