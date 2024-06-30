import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindArticlePreviewsWhereInput } from './find-article-previews-where.input';
import { FindArticlePreviewsOrderByInput } from './find-article-previews-order-by.input';
import { FindArticlePreviewsArgs } from './find-article-previews.args';

export class FindArticlePreviewsQuery extends PaginationQuery {
  where?: FindArticlePreviewsWhereInput;

  orderBy?: FindArticlePreviewsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindArticlePreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
