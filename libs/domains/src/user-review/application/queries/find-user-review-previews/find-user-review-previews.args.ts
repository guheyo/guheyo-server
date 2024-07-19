import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { FindUserReviewPreviewsWhereInput } from './find-user-review-previews-where.input';
import { FindUserReviewPreviewsOrderByInput } from './find-user-review-previews-order-by.input';

@ArgsType()
export class FindUserReviewPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindUserReviewPreviewsWhereInput)
  @Field(() => FindUserReviewPreviewsWhereInput, { nullable: true })
  where?: FindUserReviewPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindUserReviewPreviewsOrderByInput)
  @Field(() => FindUserReviewPreviewsOrderByInput, { nullable: true })
  orderBy?: FindUserReviewPreviewsOrderByInput;
}
