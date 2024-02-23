import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { DemandPreviewResponse } from '../../dtos/demand-preview.response';

@ObjectType()
export class PaginatedDemandPreviewsResponse extends paginated<DemandPreviewResponse>(
  DemandPreviewResponse,
) {}
