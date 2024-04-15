import { UserReviewRepository } from './adapter/out/persistence/user-review.repository';
import { USER_REVIEW_COMMAND_PROVIDERS } from './application/commands/deal-review.command.providers';
import { UserReviewSagas } from './application/sagas/user-review.sagas';

export const USER_REVIEW_PROVIDERS = [
  {
    provide: 'UserReviewLoadPort',
    useClass: UserReviewRepository,
  },
  {
    provide: 'UserReviewSavePort',
    useClass: UserReviewRepository,
  },
  ...USER_REVIEW_COMMAND_PROVIDERS,
  UserReviewSagas,
];
