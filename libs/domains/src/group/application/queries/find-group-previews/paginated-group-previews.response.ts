import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { GroupPreviewResponse } from '../../dtos/group-preview.response';

@ObjectType()
export class PaginatedGroupPreviewsResponse extends paginated<GroupPreviewResponse>(
  GroupPreviewResponse,
) {}
