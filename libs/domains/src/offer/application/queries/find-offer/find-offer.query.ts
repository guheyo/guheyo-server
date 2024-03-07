import { IQuery } from '@nestjs/cqrs';
import { FindOfferArgs } from './find-offer.args';

export class FindOfferQuery implements IQuery {
  id?: string;

  slug?: string;

  constructor(findOfferArgs: FindOfferArgs) {
    this.id = findOfferArgs.id;
    this.slug = findOfferArgs.slug;
  }
}
