import { FindSwapHandler } from './find-swap/find-swap.handler';
import { FindSwapPreviewsHandler } from './find-swap-previews/find-swap-previews.handler';
import { FindSwapCountHandler } from './find-swap-count/find-swap-count.handler';

export const SWAP_QUERY_PROVIDERS = [
  FindSwapHandler,
  FindSwapPreviewsHandler,
  FindSwapCountHandler,
];
