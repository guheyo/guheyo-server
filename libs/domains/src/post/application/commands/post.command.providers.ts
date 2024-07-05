import { ConnectOrCreateTagsHandler } from './connect-or-create-tags/connect-or-create-tags.handler';
import { ConnectTagsHandler } from './connect-tags/connect-tags.handler';
import { UpdateThumbnailHandler } from './update-thumbnail/update-thumbnail.handler';

export const POST_COMMAND_PROVIDERS = [
  ConnectTagsHandler,
  ConnectOrCreateTagsHandler,
  UpdateThumbnailHandler,
];
