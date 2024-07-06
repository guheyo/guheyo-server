import { ThreadRepository } from './adapter/out/persistence/thread.repository';
import { THREAD_COMMAND_PROVIDERS } from './application/commands/thread.command.providers';
import { THREAD_QUERY_PROVIDERS } from './application/queries/thread.query.providers';
import { ThreadSagas } from './application/sagas/thread.sagas';

export const THREAD_PROVIDERS = [
  {
    provide: 'ThreadLoadPort',
    useClass: ThreadRepository,
  },
  {
    provide: 'ThreadSavePort',
    useClass: ThreadRepository,
  },
  ...THREAD_QUERY_PROVIDERS,
  ...THREAD_COMMAND_PROVIDERS,
  ThreadSagas,
];
