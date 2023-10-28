import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuctionsArgs } from './find-auctions.args';

export class FindAuctionsQuery extends PaginationQuery {
  where: {
    productCategoryId?: string;
  };

  constructor(findAuctionsArgs: FindAuctionsArgs) {
    super(findAuctionsArgs);
    this.where = {
      productCategoryId: findAuctionsArgs.productCategoryId,
    };
  }
}
