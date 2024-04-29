import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IsOptional } from 'class-validator';
import { FindUserReviewPreviewsWhereArgs } from './find-user-review-previews-where.args';
import { FindUserReviewPreviewsOrderByArgs } from './find-user-review-previews-order-by.args';

@ArgsType()
export class FindUserReviewPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindUserReviewPreviewsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindUserReviewPreviewsOrderByArgs;
}
