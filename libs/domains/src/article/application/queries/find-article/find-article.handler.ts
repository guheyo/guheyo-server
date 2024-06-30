import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ArticleErrorMessage } from '@lib/domains/article/domain/article.error.message';
import { ARTICLE } from '@lib/domains/article/domain/article.constants';
import { FindArticleQuery } from './find-article.query';
import { ArticleResponse } from '../../dtos/article.response';

@QueryHandler(FindArticleQuery)
export class FindArticleHandler extends PrismaQueryHandler {
  async execute(query: FindArticleQuery): Promise<ArticleResponse | null> {
    if (!query.id && !query.slug) return null;

    const article = await this.prismaService.article.findFirst({
      where: {
        id: query.id,
        post: {
          slug: query.slug,
        },
      },
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
    });

    if (!article) throw new NotFoundException(ArticleErrorMessage.ARTICLE_NOT_FOUND);
    if (article.post.archivedAt && article.post.userId !== query.userId)
      throw new ForbiddenException(
        ArticleErrorMessage.FIND_ARTICLES_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: ARTICLE,
        refId: article.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return plainToClass(ArticleResponse, {
      ...article,
      post: {
        ...article.post,
        images,
        commentCount: article.post.comments.length,
        reportCount: 0,
      },
    });
  }
}
