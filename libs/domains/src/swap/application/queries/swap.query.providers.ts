import { FindSwapByIdHandler } from './find-swap-by-id/find-swap-by-id.handler';
import { FindSwapsHandler } from './find-swaps/find-swaps.handler';

export const SWAP_QUERY_PROVIDERS = [FindSwapByIdHandler, FindSwapsHandler];
