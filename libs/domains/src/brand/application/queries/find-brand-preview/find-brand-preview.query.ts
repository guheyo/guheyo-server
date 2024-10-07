import { IQuery } from '@nestjs/cqrs';
import { FindBrandPreviewArgs } from './find-brand-preview.args';

export class FindBrandPreviewQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindBrandPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
