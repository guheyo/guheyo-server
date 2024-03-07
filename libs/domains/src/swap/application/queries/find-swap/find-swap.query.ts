import { IQuery } from '@nestjs/cqrs';
import { FindSwapArgs } from './find-swap.args';

export class FindSwapQuery implements IQuery {
  id?: string;

  slug?: string;

  constructor(findSwapArgs: FindSwapArgs) {
    this.id = findSwapArgs.id;
    this.slug = findSwapArgs.slug;
  }
}
