import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { FindGroupProfilesArgs } from './find-group-profiles.args';

export class FindGroupProfilesQuery extends PaginationQuery {
  where: {
    name?: any;
  };

  constructor(findGroupProfilesArgs: FindGroupProfilesArgs) {
    super(findGroupProfilesArgs);
    this.where = {
      name: parseContainsSearcher({ keyword: findGroupProfilesArgs.keyword }),
    };
  }
}
