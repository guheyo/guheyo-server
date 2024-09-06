import { PlatformRepository } from './adapter/out/persistence/platform.repository';
import { PLATFORM_QUERY_PROVIDERS } from './application/queries/platform.query.providers';

export const PLATFORM_PROVIDERS = [
  {
    provide: 'PlatformLoadPort',
    useClass: PlatformRepository,
  },
  {
    provide: 'PlatformSavePort',
    useClass: PlatformRepository,
  },
  ...PLATFORM_QUERY_PROVIDERS,
];
