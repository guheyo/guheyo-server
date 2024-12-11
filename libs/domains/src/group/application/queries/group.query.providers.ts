import { FindGroupHandler } from './find-group/find-group.handler';
import { FindGroupsHandler } from './find-groups/find-gorups.handler';
import { FindGroupPreviewsHandler } from './find-group-previews/find-group-previews.handler';
import { FindGroupProfilesHandler } from './find-group-profiles/find-group-profiles.handler';
import { FindCategoriesHandler } from './find-categories/find-categories.handler';

export const GROUP_QUERY_PROVIDERS = [
  FindGroupHandler,
  FindGroupsHandler,
  FindGroupPreviewsHandler,
  FindGroupProfilesHandler,
  FindCategoriesHandler,
];
