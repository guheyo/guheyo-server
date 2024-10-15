import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToInstance } from 'class-transformer';
import { FindAuthorsQuery } from './find-authors.query';
import { PaginatedAuthorsResponse } from './paginated-authors.response';
import { AuthorResponse } from '../../dtos/author.response';

@QueryHandler(FindAuthorsQuery)
export class FindAuthorsHandler extends PrismaQueryHandler {
  async execute(query: FindAuthorsQuery): Promise<PaginatedAuthorsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const users = await this.prismaService.user.findMany({
      where: {
        id: query.where?.userId,
        username: {
          contains: query.keyword,
          mode: 'insensitive',
        },
        ...(query.where?.followed && {
          followers: {
            some: {
              followerId: query.userId || '-1',
            },
          },
        }),
        ...(query.where?.socialAccount && {
          socialAccounts: {
            some: {
              provider: query.where?.socialAccount?.provider,
              socialId: query.where?.socialAccount?.socialId,
            },
          },
        }),
      },
      include: {
        ...(query.userId && {
          followers: {
            where: {
              followerId: query.userId,
            },
          },
        }),
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
        socialAccounts: true,
        followers: {
          include: {
            follower: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<AuthorResponse>(
      users.map((user) =>
        plainToInstance(AuthorResponse, {
          ...user,
          // NOTE: included followers if followerId === query.userId
          followed: query.userId && user.followers.length > 0,
        }),
      ),
      'id',
      query.take,
    );
  }
}
