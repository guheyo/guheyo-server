import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindUserQuery } from './find-user.query';
import { UserResponse } from '../../dtos/user.response';

@QueryHandler(FindUserQuery)
export class FindUserHandler extends PrismaQueryHandler {
  async execute(query: FindUserQuery): Promise<UserResponse | null> {
    let user;
    const include = {
      ...(query.user?.id && {
        followers: {
          where: {
            followerId: query.user?.id,
          },
        },
      }),
    };

    if (query.id) {
      user = await this.prismaService.user.findUnique({
        where: {
          id: query.id,
        },
        include,
      });
    }

    if (query.provider && query.socialId) {
      user = await this.prismaService.user.findFirst({
        where: {
          socialAccounts: {
            some: {
              provider: query.provider,
              socialId: query.socialId,
            },
          },
        },
        include,
      });
    }
    if (query.username) {
      user = await this.prismaService.user.findUnique({
        where: {
          username: query.username,
        },
        include,
      });
    }

    return user
      ? plainToInstance(UserResponse, {
          ...user,
          followed: query.user?.id && user.followers.length > 0,
        })
      : null;
  }
}
