import { IQuery } from '@nestjs/cqrs';
import { FindProductArgs } from './find-product.args';

export class FindProductQuery implements IQuery {
  id?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindProductArgs; userId?: string }) {
    this.id = args.id;
    this.userId = userId;
  }
}
