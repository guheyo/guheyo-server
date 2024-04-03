import { FindVersionPreviewHandler } from './find-version-preview/find-version-preview.handler';
import { FindVersionHandler } from './find-version/find-version.handler';

export const VERSION_QUERY_PROVIDERS = [FindVersionPreviewHandler, FindVersionHandler];
