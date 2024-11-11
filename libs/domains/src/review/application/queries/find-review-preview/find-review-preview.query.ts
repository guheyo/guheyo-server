import { IQuery } from '@nestjs/cqrs';
import { FindReviewPreviewArgs } from './find-review-preview.args';

export class FindReviewPreviewQuery implements IQuery {
  id?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindReviewPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.userId = userId;
  }
}
