import { CheckOtherUserReviewHandler } from './check-other-user-review/check-other-user-review.handler';
import { CreateUserReviewHandler } from './create-user-review/create-user-review.handler';
import { DeleteUserReviewHandler } from './delete-user-review/delete-user-review.handler';

export const USER_REVIEW_COMMAND_PROVIDERS = [
  CreateUserReviewHandler,
  CheckOtherUserReviewHandler,
  DeleteUserReviewHandler,
];
