import { SwapRepository } from './adapter/out/persistence/swap.repository';
import { SWAP_COMMAND_PROVIDERS } from './application/commands/swap.command.providers';
import { SWAP_QUERY_PROVIDERS } from './application/queries/swap.query.providers';
import { SWAP_EVENT_PROVIDERS } from './application/events/swap.event.providers';
import { SwapSagas } from './application/sagas/swap.sagas';

export const SWAP_PROVIDERS = [
  {
    provide: 'SwapLoadPort',
    useClass: SwapRepository,
  },
  {
    provide: 'SwapSavePort',
    useClass: SwapRepository,
  },
  ...SWAP_COMMAND_PROVIDERS,
  ...SWAP_QUERY_PROVIDERS,
  ...SWAP_EVENT_PROVIDERS,
  SwapSagas,
];
