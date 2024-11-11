import { ReviewRepository } from './adapter/out/persistence/review.repository';
import { REVIEW_COMMAND_PROVIDERS } from './application/commands/review.command.providers';
import { REVIEW_QUERY_PROVIDERS } from './application/queries/review.query.providers';

export const REVIEW_PROVIDERS = [
  {
    provide: 'ReviewLoadPort',
    useClass: ReviewRepository,
  },
  {
    provide: 'ReviewSavePort',
    useClass: ReviewRepository,
  },
  ...REVIEW_QUERY_PROVIDERS,
  ...REVIEW_COMMAND_PROVIDERS,
];
