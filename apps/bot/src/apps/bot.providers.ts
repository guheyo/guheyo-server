import { BOT_COMMENT_PROVIDERS } from './comment/comment.providers';
import { BOT_GROUP_PROVIDERS } from './group/group.providers';
import { BOT_OFFER_PROVIDERS } from './offer/offer.proviers';
import { BOT_POST_PROVIDERS } from './post/post.proviers';
import { BOT_USER_IMAGE_PROVIDERS } from './user-image/user-image.providers';
import { BOT_USER_REVIEW_PROVIDERS } from './user-review/user-review.providers';
import { BOT_USER_PROVIDERS } from './user/user.providers';

export const BOT_PROVIDERS = [
  ...BOT_GROUP_PROVIDERS,
  ...BOT_USER_PROVIDERS,
  ...BOT_USER_IMAGE_PROVIDERS,
  ...BOT_OFFER_PROVIDERS,
  ...BOT_USER_REVIEW_PROVIDERS,
  ...BOT_COMMENT_PROVIDERS,
  ...BOT_POST_PROVIDERS,
];
