import { VersionRepository } from './adapter/out/persistence/version.repository';
import { VERSION_COMMAND_PROVIDERS } from './application/commands/report.command.providers';
import { VERSION_QUERY_PROVIDERS } from './application/queries/version.query.providers';

export const VERSION_PROVIDERS = [
  {
    provide: 'VersionLoadPort',
    useClass: VersionRepository,
  },
  {
    provide: 'VersionSavePort',
    useClass: VersionRepository,
  },
  ...VERSION_QUERY_PROVIDERS,
  ...VERSION_COMMAND_PROVIDERS,
];
