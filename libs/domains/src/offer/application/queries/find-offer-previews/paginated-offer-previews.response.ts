import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { OfferPreviewResponse } from '../../dtos/offer-preview.response';

@ObjectType()
export class PaginatedOfferPreviewsResponse extends paginated<OfferPreviewResponse>(
  OfferPreviewResponse,
) {}
