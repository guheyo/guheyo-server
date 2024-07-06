import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ThreadPreviewResponse } from '../../dtos/thread-preview.response';

@ObjectType()
export class PaginatedThreadPreviewsResponse extends paginated<ThreadPreviewResponse>(
  ThreadPreviewResponse,
) {}
