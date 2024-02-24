import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindDemandPreviewsArgs } from './find-demand-previews.args';

export class FindDemandPreviewsQuery extends PaginationQuery {
  where: {
    groupId?: string;
    productCategoryId?: string;
    buyerId?: string;
    status?: string;
    name?: {
      search: string;
    };
  };

  constructor(findDemandPreviewsArgs: FindDemandPreviewsArgs) {
    super(findDemandPreviewsArgs);
    this.where = {
      groupId: findDemandPreviewsArgs.groupId,
      productCategoryId: findDemandPreviewsArgs.productCategoryId,
      buyerId: findDemandPreviewsArgs.buyerId,
      status: findDemandPreviewsArgs.status,
      name: parseFollowedBySearcher(findDemandPreviewsArgs.keyword),
    };
  }
}
