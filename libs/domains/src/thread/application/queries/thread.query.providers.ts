import { FindThreadPreviewHandler } from './find-thread-preview/find-thread-preview.handler';
import { FindThreadPreviewsHandler } from './find-thread-previews/find-thread-previews.handler';
import { FindThreadHandler } from './find-thread/find-thread.handler';

export const THREAD_QUERY_PROVIDERS = [
  FindThreadPreviewsHandler,
  FindThreadPreviewHandler,
  FindThreadHandler,
];
