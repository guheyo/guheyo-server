import { IQuery } from '@nestjs/cqrs';
import { FindSwapArgs } from './find-swap.args';

export class FindSwapQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindSwapArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
