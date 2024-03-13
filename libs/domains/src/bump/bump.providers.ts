import { BumpRepository } from './adapter/out/persistence/bump.repository';
import { BUMP_COMMAND_PROVIDERS } from './application/commands/bump.command.providers';

export const BUMP_PROVIDERS = [
  {
    provide: 'BumpLoadPort',
    useClass: BumpRepository,
  },
  {
    provide: 'BumpSavePort',
    useClass: BumpRepository,
  },
  ...BUMP_COMMAND_PROVIDERS,
];