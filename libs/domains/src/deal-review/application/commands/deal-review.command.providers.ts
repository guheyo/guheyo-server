import { CheckOtherDealReviewHandler } from './check-other-deal-review/check-other-deal-review.handler';
import { CreateDealReviewHandler } from './create-deal-review/create-deal-review.handler';

export const DEAL_REVIEW_COMMAND_PROVIDERS = [CreateDealReviewHandler, CheckOtherDealReviewHandler];
