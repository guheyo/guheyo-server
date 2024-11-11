import { FindReviewPreviewHandler } from './find-review-preview/find-review-preview.handler';
import { FindReviewHandler } from './find-review/find-review.handler';
import { FindReviewsHandler } from './find-reviews/find-reviews.handler';

export const REVIEW_QUERY_PROVIDERS = [
  FindReviewHandler,
  FindReviewPreviewHandler,
  FindReviewsHandler,
];
