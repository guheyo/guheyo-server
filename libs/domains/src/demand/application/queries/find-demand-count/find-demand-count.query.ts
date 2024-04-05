import { IQuery } from '@nestjs/cqrs';
import { FindDemandCountArgs } from './find-demand-count.args';

export class FindDemandCountQuery implements IQuery {
  buyerId: string;

  productCategoryId: string;

  fromHours: number;

  constructor({ args }: { args: FindDemandCountArgs }) {
    this.buyerId = args.buyerId;
    this.productCategoryId = args.productCategoryId;
    this.fromHours = args.fromHours;
  }
}
