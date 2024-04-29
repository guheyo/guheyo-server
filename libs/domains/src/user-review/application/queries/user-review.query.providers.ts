import { FindUserReviewPreviewsHandler } from './find-user-review-previews/find-user-review-previews.handler';
import { FindUserReviewHandler } from './find-user-review/find-user-review.handler';

export const USER_REVIEW_QUERY_PROVIDERS = [FindUserReviewPreviewsHandler, FindUserReviewHandler];
