import { MannerTagRepository } from './adapter/out/persistence/manner-tag.repository';
import { MANNER_TAG_QUERY_PROVIDERS } from './application/queries/manner-tag.query.providers';

export const MANNER_TAG_PROVIDERS = [
  {
    provide: 'MannerTagLoadPort',
    useClass: MannerTagRepository,
  },
  {
    provide: 'MannerTagSavePort',
    useClass: MannerTagRepository,
  },
  ...MANNER_TAG_QUERY_PROVIDERS,
];
