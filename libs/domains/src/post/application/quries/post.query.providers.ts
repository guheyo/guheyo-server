import { CheckPostsNotExistHandler } from './check-user-posts-not-exist/check-posts-not-exist.handler';
import { FindPostPreviewHandler } from './find-post-preview/find-post-preview.handler';

export const POST_QUERY_PROVIDERS = [FindPostPreviewHandler, CheckPostsNotExistHandler];
