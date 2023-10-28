import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { DemandResponse } from '../../dtos/demand.response';

@ObjectType()
export class PaginatedDemandsResponse extends paginated<DemandResponse>(DemandResponse) {}
