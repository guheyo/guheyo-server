import { TagRepository } from './adapter/out/persistence/tag.repository';
import { TAG_QUERY_PROVIDERS } from './application/queries/tag.query.providers';

export const TAG_PROVIDERS = [
  {
    provide: 'TagLoadPort',
    useClass: TagRepository,
  },
  {
    provide: 'TagSavePort',
    useClass: TagRepository,
  },
  ...TAG_QUERY_PROVIDERS,
];
