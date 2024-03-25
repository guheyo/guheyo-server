import { IQuery } from '@nestjs/cqrs';
import { FindOfferArgs } from './find-offer.args';

export class FindOfferQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindOfferArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
