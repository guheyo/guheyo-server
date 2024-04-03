import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindGroupProfilesArgs } from './find-group-profiles.args';

export class FindGroupProfilesQuery extends PaginationQuery {
  where: {
    name?: {
      search: string;
    };
  };

  constructor(findGroupProfilesArgs: FindGroupProfilesArgs) {
    super(findGroupProfilesArgs);
    this.where = {
      name: parseFollowedBySearcher(findGroupProfilesArgs.keyword),
    };
  }
}
