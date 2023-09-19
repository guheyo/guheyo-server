import { USER_COMMAND_PROVIDERS } from './application/commands/user.command.providers';
import { USER_QUERY_PROVIDERS } from './application/queries/user.query.providers';
import { USER_EVENT_PROVIDERS } from './application/events/user.event.providers';
import { USER_SAGA_PROVIDERS } from './application/sagas/user.saga.providers';

export const USER_PROVIDERS = [
  ...USER_COMMAND_PROVIDERS,
  ...USER_QUERY_PROVIDERS,
  ...USER_EVENT_PROVIDERS,
  ...USER_SAGA_PROVIDERS,
];
