import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindGroupProfilesArgs extends PaginationSearchArgs {}
