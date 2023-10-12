import { BOT_OFFER_PROVIDERS } from './offer/offer.providers';
import { BOT_USER_IMAGE_PROVIDERS } from './user-image/user-image.providers';
import { BOT_USER_PROVIDERS } from './user/user.providers';

export const BOT_PROVIDERS = [
  ...BOT_USER_PROVIDERS,
  ...BOT_USER_IMAGE_PROVIDERS,
  ...BOT_OFFER_PROVIDERS,
];
