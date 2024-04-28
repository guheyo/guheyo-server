import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { UserReviewPreviewResponse } from '../../dtos/user-review-preview.response';

@ObjectType()
export class PaginatedUserReviewPreviewsResponse extends paginated<UserReviewPreviewResponse>(
  UserReviewPreviewResponse,
) {}
