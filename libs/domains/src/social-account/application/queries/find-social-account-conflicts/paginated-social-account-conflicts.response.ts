import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { SocialAccountConflictResponse } from '../../dtos/social-account-conflict.response';

@ObjectType()
export class PaginatedSocialAccountConflictsResponse extends paginated<SocialAccountConflictResponse>(
  SocialAccountConflictResponse,
) {}
