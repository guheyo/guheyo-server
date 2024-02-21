import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindOfferPreviewsArgs } from './find-offer-previews.args';

export class FindOfferPreviewsQuery extends PaginationQuery {
  where: {
    productCategoryId?: string;
    sellerId?: string;
    status?: string;
    name?: {
      search: string;
    };
  };

  constructor(findOfferPreviewsArgs: FindOfferPreviewsArgs) {
    super(findOfferPreviewsArgs);
    this.where = {
      productCategoryId: findOfferPreviewsArgs.productCategoryId,
      sellerId: findOfferPreviewsArgs.sellerId,
      status: findOfferPreviewsArgs.status,
      name: parseFollowedBySearcher(findOfferPreviewsArgs.keyword),
    };
  }
}
