import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { UserReviewEntity } from '@lib/domains/user-review/domain/user-review.entity';
import { UserReviewLoadPort } from '@lib/domains/user-review/application/ports/out/user-review.load.port';
import { UserReviewSavePort } from '@lib/domains/user-review/application/ports/out/user-review.save.port';

@Injectable()
export class UserReviewRepository
  extends PrismaRepository<UserReviewEntity>
  implements UserReviewLoadPort, UserReviewSavePort
{
  constructor() {
    super(UserReviewEntity);
  }

  async findById(id: string): Promise<UserReviewEntity | null> {
    const userReview = await this.prismaService.userReview.findUnique({
      where: {
        id,
      },
      include: {
        post: {
          include: {
            user: {
              include: {
                socialAccounts: true,
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
              },
            },
            tags: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });
    return this.toEntity(userReview);
  }

  async findLastUserReview({
    type,
    offerId,
    auctionId,
    userId,
  }: {
    type: string;
    offerId?: string;
    auctionId?: string;
    userId: string;
  }): Promise<UserReviewEntity | null> {
    const userReview = await this.prismaService.userReview.findFirst({
      where: {
        type,
        offerId,
        auctionId,
        post: {
          userId,
        },
      },
      include: {
        post: {
          include: {
            user: {
              include: {
                socialAccounts: true,
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
              },
            },
            tags: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });
    return this.toEntity(userReview);
  }

  async create(userReview: UserReviewEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        ..._.pick(userReview.post, [
          'type',
          'title',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
        tags: {
          connect: userReview.post.tags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
    });
    await this.prismaService.userReview.create({
      data: {
        ..._.pick(userReview, [
          'id',
          'type',
          'reviewedUserId',
          'offerId',
          'auctionId',
          'content',
          'rating',
          'status',
        ]),
        postId: post.id,
      },
    });
  }

  async createMany(userReviews: UserReviewEntity[]): Promise<void> {
    await userReviews.map(async (userReview) => this.create(userReview));
  }

  async save(userReview: UserReviewEntity): Promise<void> {
    await this.prismaService.userReview.update({
      where: {
        id: userReview.id,
      },
      data: {
        post: {
          update: {
            ..._.pick(userReview.post, ['pending', 'title', 'categoryId']),
          },
          ..._.pick(userReview, ['content', 'rating', 'status']),
        },
      },
    });
  }

  async delete(userReview: UserReviewEntity): Promise<void> {
    await this.prismaService.userReview.delete({
      where: {
        id: userReview.id,
      },
    });
  }
}
