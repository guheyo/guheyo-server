import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersArgs } from './find-offers.args';

export class FindOffersQuery extends PaginationQuery {
  where: {
    productCategoryId?: string;
    sellerId?: string;
    status?: string;
  };

  constructor(findOffersArgs: FindOffersArgs) {
    super(findOffersArgs);
    this.where = {
      productCategoryId: findOffersArgs.productCategoryId,
      sellerId: findOffersArgs.sellerId,
      status: findOffersArgs.status,
    };
  }
}
