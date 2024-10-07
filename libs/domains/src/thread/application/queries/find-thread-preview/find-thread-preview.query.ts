import { IQuery } from '@nestjs/cqrs';
import { FindThreadPreviewArgs } from './find-thread-preview.args';

export class FindThreadPreviewQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindThreadPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
