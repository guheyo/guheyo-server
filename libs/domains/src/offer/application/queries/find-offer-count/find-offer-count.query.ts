import { IQuery } from '@nestjs/cqrs';
import { FindOfferCountArgs } from './find-offer-count.args';

export class FindOfferCountQuery implements IQuery {
  sellerId: string;

  productCategoryId: string;

  fromHours: number;

  constructor({ args }: { args: FindOfferCountArgs }) {
    this.sellerId = args.sellerId;
    this.productCategoryId = args.productCategoryId;
    this.fromHours = args.fromHours;
  }
}
