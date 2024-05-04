import { ReactionRepository } from './adapter/out/persistence/reaction.repository';
import { REACTION_COMMAND_PROVIDERS } from './application/commands/reaction.command.providers';

export const REACTION_PROVIDERS = [
  {
    provide: 'ReactionLoadPort',
    useClass: ReactionRepository,
  },
  {
    provide: 'ReactionSavePort',
    useClass: ReactionRepository,
  },
  ...REACTION_COMMAND_PROVIDERS,
];
