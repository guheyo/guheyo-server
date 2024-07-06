import { IQuery } from '@nestjs/cqrs';
import { FindThreadArgs } from './find-thread.args';

export class FindThreadQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindThreadArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
