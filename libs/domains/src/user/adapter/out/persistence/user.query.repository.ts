import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { UserLoadPort } from '@lib/domains/user/application/port/out/user.load.port';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { FindMyUserByIdQuery } from '@lib/domains/user/application/queries/find-my-user-by-id/find-my-user-by-id.query';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { UsersPaginationResponse } from '@lib/domains/user/application/queries/find-users/users.pagination.response';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { UserReponse } from '@lib/domains/user/application/dtos/user.reponse';

@Injectable()
export class UserQueryRepository implements UserLoadPort {
  constructor(private prismaService: PrismaService) {}

  async findMyUserById(query: FindMyUserByIdQuery): Promise<MyUserResponse | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: query.id },
      include: {
        members: {
          include: {
            roles: true,
          },
        },
        socialAccounts: true,
      },
    });
    return user ? new MyUserResponse(user) : null;
  }

  async findMyUserBySocailAccount(
    query: FindMyUserBySocialAccountQuery,
  ): Promise<MyUserResponse | null> {
    const users = await this.prismaService.user.findMany({
      where: {
        socialAccounts: {
          some: {
            provider: query.provider,
            socialId: query.socialId,
          },
        },
      },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
    return users.length ? new MyUserResponse(users[0]) : null;
  }

  async findUsers(query: FindUsersQuery): Promise<UsersPaginationResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const users = await this.prismaService.user.findMany({
      cursor,
      take: query.take,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return paginate<UserReponse>(users, 'id', query.take);
  }
}
