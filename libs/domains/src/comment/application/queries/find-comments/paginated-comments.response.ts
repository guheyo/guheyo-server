import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { CommentWithAuthorResponse } from '../../dtos/comment-with-author.response';

@ObjectType()
export class PaginatedCommentsResponse extends paginated<CommentWithAuthorResponse>(
  CommentWithAuthorResponse,
) {}
