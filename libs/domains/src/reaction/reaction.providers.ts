import { ReactionRepository } from './adapter/out/persistence/reaction.repository';
import { REACTION_COMMAND_PROVIDERS } from './application/commands/reaction.command.providers';
import { REACTION_QUERY_PROVIDERS } from './application/queries/reaction.query.providers';

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
  ...REACTION_QUERY_PROVIDERS,
];
