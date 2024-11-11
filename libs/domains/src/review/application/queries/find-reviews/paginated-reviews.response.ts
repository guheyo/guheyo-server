import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ReviewPreviewResponse } from '../../dtos/review-preview.response';

@ObjectType()
export class PaginatedReviewsResponse extends paginated<ReviewPreviewResponse>(
  ReviewPreviewResponse,
) {}
