import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindSwapPreviewsArgs } from './find-swap-previews.args';

export class FindSwapPreviewsQuery extends PaginationQuery {
  where: {
    groupId?: string;
    productCategoryId?: string;
    proposerId?: string;
    status?: string;
    name?: {
      search: string;
    };
  };

  constructor(findSwapPreviewsArgs: FindSwapPreviewsArgs) {
    super(findSwapPreviewsArgs);
    this.where = {
      groupId: findSwapPreviewsArgs.groupId,
      productCategoryId: findSwapPreviewsArgs.productCategoryId,
      proposerId: findSwapPreviewsArgs.proposerId,
      status: findSwapPreviewsArgs.status,
      name: parseFollowedBySearcher(findSwapPreviewsArgs.keyword),
    };
  }
}
