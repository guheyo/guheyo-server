import { IQuery } from '@nestjs/cqrs';
import { FindOfferCountArgs } from './find-offer-count.args';

export class FindOfferCountQuery implements IQuery {
  userId: string;

  businessFunction: string;

  categoryId: string;

  fromHours: number;

  constructor({ args }: { args: FindOfferCountArgs }) {
    this.userId = args.userId;
    this.businessFunction = args.businessFunction;
    this.categoryId = args.categoryId;
    this.fromHours = args.fromHours;
  }
}
