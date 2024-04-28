import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { PaginatedUserReviewPreviewsResponse } from './paginated-user-review-previews.response';
import { UserReviewPreviewResponse } from '../../dtos/user-review-preview.response';
import { FindUserReviewPreviewsQuery } from './find-user-review-previews.query';

@QueryHandler(FindUserReviewPreviewsQuery)
export class FindUserReviewPreviewsHandler extends PrismaQueryHandler<
  FindUserReviewPreviewsQuery,
  UserReviewPreviewResponse
> {
  constructor() {
    super(UserReviewPreviewResponse);
  }

  async execute(query: FindUserReviewPreviewsQuery): Promise<PaginatedUserReviewPreviewsResponse> {
    const where: Prisma.UserReviewWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
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

    const userReviews = await this.prismaService.userReview.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            user: {
              include: {
                members: {
                  include: {
                    group: true,
                    roles: {
                      orderBy: {
                        position: 'asc',
                      },
                    },
                  },
                },
                socialAccounts: true,
              },
            },
            tags: true,
          },
        },
        reviewedUser: {
          include: {
            members: {
              include: {
                group: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
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

    return paginate<UserReviewPreviewResponse>(this.parseResponses(userReviews), 'id', query.take);
  }
}
