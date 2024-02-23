import { FindSwapByIdHandler } from './find-swap-by-id/find-swap-by-id.handler';
import { FindSwapHandler } from './find-swap/find-swap.handler';
import { FindSwapPreviewsHandler } from './find-swap-previews/find-swap-previews.handler';

export const SWAP_QUERY_PROVIDERS = [FindSwapByIdHandler, FindSwapHandler, FindSwapPreviewsHandler];
