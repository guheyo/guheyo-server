import { DealReviewRepository } from './adapter/out/persistence/deal-review.repository';
import { DEAL_REVIEW_COMMAND_PROVIDERS } from './application/commands/deal-review.command.providers';
import { DealReviewSagas } from './application/sagas/deal-review.sagas';

export const DEAL_REVIEW_PROVIDERS = [
  {
    provide: 'DealReviewLoadPort',
    useClass: DealReviewRepository,
  },
  {
    provide: 'DealReviewSavePort',
    useClass: DealReviewRepository,
  },
  ...DEAL_REVIEW_COMMAND_PROVIDERS,
  DealReviewSagas,
];
