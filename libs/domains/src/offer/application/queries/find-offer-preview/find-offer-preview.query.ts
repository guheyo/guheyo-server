import { IQuery } from '@nestjs/cqrs';
import { FindOfferPreviewArgs } from './find-offer-preview.args';

export class FindOfferPreviewQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindOfferPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
