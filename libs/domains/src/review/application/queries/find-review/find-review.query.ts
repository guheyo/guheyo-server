import { IQuery } from '@nestjs/cqrs';
import { FindReviewArgs } from './find-review.args';

export class FindReviewQuery implements IQuery {
  id?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindReviewArgs; userId?: string }) {
    this.id = args.id;
    this.userId = userId;
  }
}
