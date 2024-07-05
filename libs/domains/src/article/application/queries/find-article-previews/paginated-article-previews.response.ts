import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ArticlePreviewResponse } from '../../dtos/article-preview.response';

@ObjectType()
export class PaginatedArticlePreviewsResponse extends paginated<ArticlePreviewResponse>(
  ArticlePreviewResponse,
) {}
