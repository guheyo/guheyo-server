import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { GroupProfileResponse } from '../../dtos/group-profile.response';

@ObjectType()
export class PaginatedGroupProfilesResponse extends paginated<GroupProfileResponse>(
  GroupProfileResponse,
) {}
