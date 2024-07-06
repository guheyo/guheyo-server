import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindThreadPreviewsWhereInput } from './find-thread-previews-where.input';
import { FindThreadPreviewsOrderByInput } from './find-thread-previews-order-by.input';

@ArgsType()
export class FindThreadPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindThreadPreviewsWhereInput)
  @Field(() => FindThreadPreviewsWhereInput, { nullable: true })
  where?: FindThreadPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindThreadPreviewsOrderByInput)
  @Field(() => FindThreadPreviewsOrderByInput, { nullable: true })
  orderBy?: FindThreadPreviewsOrderByInput;
}
