import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersArgs } from './find-offers.args';

export class FindOffersQuery extends PaginationQuery {
  where: {
    productCategoryId: string;
    status?: string;
  };

  constructor(findOffersArgs: FindOffersArgs) {
    super(findOffersArgs);
    this.where = {
      productCategoryId: findOffersArgs.productCategoryId,
      status: findOffersArgs.status,
    };
  }
}
