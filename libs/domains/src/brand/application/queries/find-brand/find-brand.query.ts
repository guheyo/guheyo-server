import { IQuery } from '@nestjs/cqrs';
import { FindBrandArgs } from './find-brand.args';

export class FindBrandQuery implements IQuery {
  id?: string;

  slug?: string;

  followed?: boolean;

  userId?: string;

  constructor({ args, userId }: { args: FindBrandArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.followed = args.followed;
    this.userId = userId;
  }
}
