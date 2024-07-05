import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PaginatedArticlePreviewsResponse } from './paginated-article-previews.response';
import { ArticlePreviewResponse } from '../../dtos/article-preview.response';
import { FindArticlePreviewsQuery } from './find-article-previews.query';

@QueryHandler(FindArticlePreviewsQuery)
export class FindArticlePreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindArticlePreviewsQuery): Promise<PaginatedArticlePreviewsResponse> {
    const where: Prisma.ArticleWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            userId: query.where.userId,
            pending: query.where.pending,
            title: parseFollowedBySearcher(query.keyword),
          },
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const articles = await this.prismaService.article.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            group: true,
            category: true,
            user: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
                socialAccounts: true,
              },
            },
            tags: true,
            comments: {
              where: {
                deletedAt: null,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<ArticlePreviewResponse>(
      articles.map((article) =>
        plainToClass(ArticlePreviewResponse, {
          ...article,
          post: {
            ...article.post,
            commentCount: article.post.comments.length,
          },
        }),
      ),
      'id',
      query.take,
    );
  }
}
