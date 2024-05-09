import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { USER_REVIEW } from '@lib/domains/user-review/domain/user-review.constants';
import { UserReviewErrorMessage } from '@lib/domains/user-review/domain/user-review.error.message';
import { FindUserReviewQuery } from './find-user-review.query';
import { UserReviewResponse } from '../../dtos/user-review.response';

@QueryHandler(FindUserReviewQuery)
export class FindUserReviewHandler extends PrismaQueryHandler<
  FindUserReviewQuery,
  UserReviewResponse
> {
  constructor() {
    super(UserReviewResponse);
  }

  async execute(query: FindUserReviewQuery): Promise<UserReviewResponse | null> {
    if (!query.id && !query.slug) return null;

    const userReview = await this.prismaService.userReview.findFirst({
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
                  include: {
                    group: true,
                  },
                  orderBy: {
                    position: 'asc',
                  },
                },
                socialAccounts: true,
              },
            },
            tags: true,
            comments: {
              select: {
                id: true,
              },
            },
          },
        },
        reviewedUser: {
          include: {
            roles: {
              include: {
                group: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
    });

    if (!userReview) throw new NotFoundException(UserReviewErrorMessage.USER_REVIEW_NOT_FOUND);
    if (userReview.post.archivedAt && userReview.post.userId !== query.userId)
      throw new ForbiddenException(
        UserReviewErrorMessage.FIND_USER_REVIEWS_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: USER_REVIEW,
        refId: userReview.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponse({
      ...userReview,
      post: {
        ...userReview.post,
        images,
        commentCount: userReview.post.comments.length,
      },
    });
  }
}
