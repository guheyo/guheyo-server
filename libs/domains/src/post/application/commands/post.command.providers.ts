import { CheckPostReportsHandler } from './check-post-reports/check-post-reports.handler';
import { ConnectTagsHandler } from './connect-tags/connect-tags.handler';

export const POST_COMMAND_PROVIDERS = [CheckPostReportsHandler, ConnectTagsHandler];
