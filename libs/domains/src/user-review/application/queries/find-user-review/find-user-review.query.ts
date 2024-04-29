import { IQuery } from '@nestjs/cqrs';
import { FindUserReviewArgs } from './find-user-review.args';

export class FindUserReviewQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindUserReviewArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
