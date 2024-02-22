import { FindGroupByIdHandler } from './find-group-by-id/find-group-by-id.handler';
import { FindGroupHandler } from './find-group/find-group.handler';
import { FindGroupsHandler } from './find-groups/find-gorups.handler';
import { FindGroupPreviewsHandler } from './find-group-previews/find-group-previews.handler';
import { FindGroupProfilesHandler } from './find-group-profiles/find-group-profiles.handler';

export const GROUP_QUERY_PROVIDERS = [
  FindGroupByIdHandler,
  FindGroupHandler,
  FindGroupsHandler,
  FindGroupPreviewsHandler,
  FindGroupProfilesHandler,
];
