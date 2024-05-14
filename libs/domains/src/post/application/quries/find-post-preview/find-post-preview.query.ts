import { IQuery } from '@nestjs/cqrs';
import { FindPostPreviewArgs } from './find-post-preview.args';

export class FindPostPreviewQuery implements IQuery {
  id: string;

  userId?: string;

  constructor({ args, userId }: { args: FindPostPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.userId = userId;
  }
}
