import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindReviewsOrderByInput } from './find-reviews-order-by.input';
import { FindReviewsWhereInput } from './find-reviews-where.input';

@ArgsType()
export class FindReviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindReviewsWhereInput)
  @Field(() => FindReviewsWhereInput, { nullable: true })
  where?: FindReviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindReviewsOrderByInput)
  @Field(() => FindReviewsOrderByInput, { nullable: true })
  orderBy?: FindReviewsOrderByInput;
}
