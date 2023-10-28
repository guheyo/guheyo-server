import { FindSwapByIdQuery } from './find-swap-by-id/find-swap-by-id.query';
import { FindSwapsHandler } from './find-swaps/find-swaps.handler';

export const SWAP_QUERY_PROVIDERS = [FindSwapByIdQuery, FindSwapsHandler];
