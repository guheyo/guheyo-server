import { CreateSwapHandler } from './create-swap/create-swap.handler';
import { UpdateSwapHandler } from './update-swap/update-swap.handler';
import { DeleteSwapHandler } from './delete-swap/delete-swap.handler';
import { CreateSwapBumpHandler } from './create-swap-bump/create-swap-bump.handler';
import { BumpSwapHandler } from './bump-swap/bump-swap.handler';

export const SWAP_COMMAND_PROVIDERS = [
  CreateSwapHandler,
  UpdateSwapHandler,
  DeleteSwapHandler,
  CreateSwapBumpHandler,
  BumpSwapHandler,
];
