import { SessionRepository } from './adapter/out/persistence/session.repository';
import { SESSION_COMMAND_PROVIDERS } from './application/commands/session.command.providers';
import { SESSION_QUERY_PROVIDERS } from './application/queries/session.query.providers';

export const SESSION_PROVIDERS = [
  {
    provide: 'SessionLoadPort',
    useClass: SessionRepository,
  },
  {
    provide: 'SessionSavePort',
    useClass: SessionRepository,
  },
  ...SESSION_COMMAND_PROVIDERS,
  ...SESSION_QUERY_PROVIDERS,
];
