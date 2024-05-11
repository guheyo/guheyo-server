import { UserReviewClient } from './clients/user-review.client';
import { UserReviewParser } from './parsers/user-review.parser';

export const BOT_USER_REVIEW_PROVIDERS = [UserReviewClient, UserReviewParser];
