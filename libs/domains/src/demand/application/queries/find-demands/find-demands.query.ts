import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindDemandsArgs } from './find-demands.args';

export class FindDemandsQuery extends PaginationQuery {
  where: {
    productCategoryId?: string;
    buyerId?: string;
    status?: string;
    name?: {
      search: string;
    };
  };

  constructor(findDemandsArgs: FindDemandsArgs) {
    super(findDemandsArgs);
    this.where = {
      productCategoryId: findDemandsArgs.productCategoryId,
      buyerId: findDemandsArgs.buyerId,
      status: findDemandsArgs.status,
      name: parseFollowedBySearcher(findDemandsArgs.keyword),
    };
  }
}
