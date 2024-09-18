import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PaginatedUserReviewPreviewsResponse } from './paginated-user-review-previews.response';
import { UserReviewPreviewResponse } from '../../dtos/user-review-preview.response';
import { FindUserReviewPreviewsQuery } from './find-user-review-previews.query';

@QueryHandler(FindUserReviewPreviewsQuery)
export class FindUserReviewPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindUserReviewPreviewsQuery): Promise<PaginatedUserReviewPreviewsResponse> {
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

    const where: Prisma.UserReviewWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            userId: query.where.userId,
            pending: query.where.pending,
            tags: {
              some: {
                type: query.where.tagType,
                name: {
                  in: query.where.tagNames,
                },
              },
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
          reviewedUserId: query.where.reviewedUserId,
          createdAt: query.where.createdAt
            ? {
                gt: new Date(query.where.createdAt.gt),
              }
            : undefined,
          ...keywordCondition,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const userReviews = await this.prismaService.userReview.findMany({
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
        reviewedUser: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<UserReviewPreviewResponse>(
      userReviews.map((userReview) =>
        plainToInstance(UserReviewPreviewResponse, {
          ...userReview,
          post: {
            ...userReview.post,
            commentCount: userReview.post.comments.length,
          },
        }),
      ),
      'id',
      query.take,
    );
  }
}
