import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { ReviewErrorMessage } from '@lib/domains/review/domain/review.error.message';
import { ForbiddenException } from '@nestjs/common';
import { FindReviewsQuery } from './find-reviews.query';
import { PaginatedReviewsResponse } from './paginated-reviews.response';
import { ReviewPreviewResponse } from '../../dtos/review-preview.response';

@QueryHandler(FindReviewsQuery)
export class FindReviewsHandler extends PrismaQueryHandler {
  async execute(query: FindReviewsQuery): Promise<PaginatedReviewsResponse> {
    if (!!query.where?.userId && query.where.userId !== query.userId && query.where.isArchived)
      throw new ForbiddenException(ReviewErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    const keywordCondition = query.keyword
      ? {
          OR: [
            ...(['all', 'title', undefined].includes(query.target)
              ? [
                  {
                    post: {
                      title: parseContainsSearcher({
                        keyword: query.keyword,
                      }),
                    },
                  },
                ]
              : []),
            ...(['all', 'content', undefined].includes(query.target)
              ? [
                  {
                    content: parseContainsSearcher({
                      keyword: query.keyword,
                    }),
                  },
                ]
              : []),
          ],
        }
      : {};

    const where: Prisma.ReviewWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            userId: query.where.userId,
            pending: query.where.pending,
            archivedAt: query.where.isArchived
              ? {
                  not: null,
                }
              : {
                  equals: null,
                },
            ...(query.where?.followed && {
              user: {
                followers: {
                  some: {
                    followerId: query.userId || '-1',
                  },
                },
              },
            }),
          },
          productId: query.where.productId,
          rating: query.where.rating,
          ...keywordCondition,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const orderBy: Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput[] = [];
    if (query.orderBy?.rating) {
      orderBy.push({
        rating: query.orderBy.rating || 'desc',
      });
    }
    orderBy.push(
      {
        createdAt: query.orderBy?.createdAt || 'desc',
      },
      {
        id: 'asc',
      },
    );

    const reviews = await this.prismaService.review.findMany({
      where,
      orderBy,
      include: {
        post: {
          include: {
            group: true,
            category: true,
            user: {
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
            tags: true,
            brands: true,
          },
        },
        product: true,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
    });

    return paginate<ReviewPreviewResponse>(
      reviews.map((review) =>
        plainToInstance(ReviewPreviewResponse, {
          ...review,
        }),
      ),
      'id',
      query.take,
    );
  }
}
