import { GroupRepository } from './adapter/out/persistence/group.repository';
import { GROUP_COMMAND_PROVIDERS } from './application/commands/group.command.providers';
import { GROUP_QUERY_PROVIDERS } from './application/queries/group.query.providers';

export const GROUP_PROVIDERS = [
  {
    provide: 'GroupLoadPort',
    useClass: GroupRepository,
  },
  {
    provide: 'GroupSavePort',
    useClass: GroupRepository,
  },
  ...GROUP_COMMAND_PROVIDERS,
  ...GROUP_QUERY_PROVIDERS,
];
