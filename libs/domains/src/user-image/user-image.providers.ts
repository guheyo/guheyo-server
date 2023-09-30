import { USER_IMAGE_COMMAND_PROVIDERS } from './application/commands/user-image-command.providers';
import { USER_IMAGE_QUERY_PROVIDERS } from './application/queries/user-image.query.providers';

export const USER_IMAGE_PROVIDERS = [
  ...USER_IMAGE_QUERY_PROVIDERS,
  ...USER_IMAGE_COMMAND_PROVIDERS,
];
