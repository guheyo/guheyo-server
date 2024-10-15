import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToInstance } from 'class-transformer';
import { FindSocialAccountConflictsQuery } from './find-social-account-conflicts.query';
import { PaginatedSocialAccountConflictsResponse } from './paginated-social-account-conflicts.response';
import { SocialAccountConflictResponse } from '../../dtos/social-account-conflict.response';

@QueryHandler(FindSocialAccountConflictsQuery)
export class FindSocialAccountConflictsHandler extends PrismaQueryHandler {
  async execute(
    query: FindSocialAccountConflictsQuery,
  ): Promise<PaginatedSocialAccountConflictsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const socialAccountConflicts = await this.prismaService.socialAccountConflict.findMany({
      cursor,
      take: query.take + 1,
      skip: query.skip,
      where: {
        status: query.where?.status,
        createdAt: query.where?.createdAt
          ? {
              gt: new Date(query.where.createdAt.gt),
            }
          : undefined,
        provider: query.where?.provider,
        socialId: query.where?.socialId,
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    const userIds = [
      ...new Set(
        socialAccountConflicts.flatMap((conflict) => [conflict.newUserId, conflict.existingUserId]),
      ),
    ];

    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      include: {
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
        socialAccounts: true,
      },
    });

    const userMap = users.reduce((acc: any, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return paginate<SocialAccountConflictResponse>(
      socialAccountConflicts.map((conflict) =>
        plainToInstance(SocialAccountConflictResponse, {
          ...conflict,
          newUser: userMap[conflict.newUserId],
          existingUser: userMap[conflict.existingUserId],
        }),
      ),
      'id',
      query.take,
    );
  }
}
