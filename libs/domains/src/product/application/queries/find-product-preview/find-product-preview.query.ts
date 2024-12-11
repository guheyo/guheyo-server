import { IQuery } from '@nestjs/cqrs';
import { FindProductPreviewArgs } from './find-product-preview.args';

export class FindProductPreviewQuery implements IQuery {
  id?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindProductPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.userId = userId;
  }
}
