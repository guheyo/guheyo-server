import { CheckPostReportsHandler } from './check-post-reports/check-post-reports.handler';
import { ConnectTagsHandler } from './connect-tags/connect-tags.handler';
import { UpdateThumbnailHandler } from './update-thumbnail/update-thumbnail.handler';

export const POST_COMMAND_PROVIDERS = [
  CheckPostReportsHandler,
  ConnectTagsHandler,
  UpdateThumbnailHandler,
];
