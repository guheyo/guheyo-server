import { IQuery } from '@nestjs/cqrs';
import { FindSwapCountArgs } from './find-swap-count.args';

export class FindSwapCountQuery implements IQuery {
  proposerId: string;

  productCategoryId: string;

  fromHours: number;

  constructor({ args }: { args: FindSwapCountArgs }) {
    this.proposerId = args.proposerId;
    this.productCategoryId = args.productCategoryId;
    this.fromHours = args.fromHours;
  }
}
