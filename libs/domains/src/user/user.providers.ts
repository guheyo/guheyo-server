import { USER_COMMAND_PROVIDERS } from './application/commands/user.command.providers';
import { USER_QUERY_PROVIDERS } from './application/queries/user.query.providers';
import { USER_EVENT_PROVIDERS } from './application/events/user.event.providers';
import { UserService } from './application/services/user.service';
import { UserRepository } from './adapter/out/persistence/user.repository';
import { UserSagas } from './application/sagas/user.sagas';

export const USER_PROVIDERS = [
  {
    provide: 'UserLoadPort',
    useClass: UserRepository,
  },
  {
    provide: 'UserSavePort',
    useClass: UserRepository,
  },
  ...USER_COMMAND_PROVIDERS,
  ...USER_QUERY_PROVIDERS,
  ...USER_EVENT_PROVIDERS,
  UserSagas,
  UserService,
];
