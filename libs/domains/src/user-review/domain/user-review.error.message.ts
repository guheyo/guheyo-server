export enum UserReviewErrorMessage {
  USER_REVIEW_NOT_FOUND = 'UserReview not found',
  USER_REVIEW_ALREADY_EXIST = 'UserReview already exist',
  USER_REVIEW_CHANGES_FROM_UNAUTHORIZED_USER = 'UserReview changes from unauthorized user',
  USER_REVIEW_DELETE_COMMAND_FROM_UNAUTHORIZED_USER = 'UserReview delete command from unauthorized user',
  FAILED_TO_FIND_REF_ID_OF_USER_REVIEW = 'Failed to find refId of userReview',
  COMMENT_USER_REVIEW_REQUEST_FROM_UNAUTHORIZED_USER = 'Comment userReview request from unauthorized user',
  FIND_USER_REVIEWS_REQUEST_FROM_UNAUTHORIZED_USER = 'Find userReview request from unauthorized user',
  USER_REVIEW_COOLDOWN_NOT_PASSED = 'UserReview cooldown not passed',
  REVIEWED_USER_NOT_FOUND = 'Reviewed user not found',
  REVIEWED_USER_ROOT_GROUP_MEMBER_NOT_FOUND = 'Reviewed user root gorup member not found',
  CREATE_USER_REVIEW_REQUEST_FROM_UNAUTHORIZED_USER = 'Create userReview request from unauthorized user',
  MISMATCH_FOR_CROSS_USER_REVIEW = 'Mismatch for cross userReview',
}
