import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { GroupResponse } from '../../dtos/group.response';

@ObjectType()
export class PaginatedGroupsResponse extends paginated<GroupResponse>(GroupResponse) {}
