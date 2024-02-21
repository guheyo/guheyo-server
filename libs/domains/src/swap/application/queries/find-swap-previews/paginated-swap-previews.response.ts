import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { SwapPreviewResponse } from '../../dtos/swap-preview.response';

@ObjectType()
export class PaginatedSwapPreviewsResponse extends paginated<SwapPreviewResponse>(
  SwapPreviewResponse,
) {}
