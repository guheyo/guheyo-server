import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindSwapsArgs } from './find-swaps.args';

export class FindSwapsQuery extends PaginationQuery {
  where: {
    productCategoryId: string;
    status?: string;
  };

  constructor(findSwapsArgs: FindSwapsArgs) {
    super(findSwapsArgs);
    this.where = {
      productCategoryId: findSwapsArgs.productCategoryId,
      status: findSwapsArgs.status,
    };
  }
}
