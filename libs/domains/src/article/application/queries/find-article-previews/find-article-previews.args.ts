import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindArticlePreviewsWhereInput } from './find-article-previews-where.input';
import { FindArticlePreviewsOrderByInput } from './find-article-previews-order-by.input';

@ArgsType()
export class FindArticlePreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindArticlePreviewsWhereInput)
  @Field(() => FindArticlePreviewsWhereInput, { nullable: true })
  where?: FindArticlePreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindArticlePreviewsOrderByInput)
  @Field(() => FindArticlePreviewsOrderByInput, { nullable: true })
  orderBy?: FindArticlePreviewsOrderByInput;
}
