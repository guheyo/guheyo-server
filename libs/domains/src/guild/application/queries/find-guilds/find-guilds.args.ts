import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindGuildsArgs extends PaginationArgs {}
