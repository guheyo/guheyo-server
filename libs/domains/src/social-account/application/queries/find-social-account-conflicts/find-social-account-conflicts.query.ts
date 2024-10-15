import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindSocialAccountConflictsWhereInput } from './find-social-account-conflicts-where.input';
import { FindSocialAccountConflictsOrderByInput } from './find-social-account-conflicts-order-by.input';
import { FindSocialAccountConflictsArgs } from './find-social-account-conflicts.args';

export class FindSocialAccountConflictsQuery extends PaginationQuery {
  where?: FindSocialAccountConflictsWhereInput;

  orderBy?: FindSocialAccountConflictsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindSocialAccountConflictsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
