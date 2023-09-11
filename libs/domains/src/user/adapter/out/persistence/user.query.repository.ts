import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { UserLoadPort } from '@lib/domains/user/application/port/out/user.load.port';
import { FindLoginUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-login-user-by-social-account/find-login-user-by-social-account.query';
import { FindLoginUserByIdQuery } from '@lib/domains/user/application/queries/find-login-user-by-id/find-login-user-by-id.query';
import { LoginUserResponse } from '@lib/domains/user/application/dtos/login-user.response';

@Injectable()
export class UserQueryRepository implements UserLoadPort {
  constructor(private prismaService: PrismaService) {}

  async findLoginUserById(query: FindLoginUserByIdQuery): Promise<LoginUserResponse | null> {
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
    return user ? new LoginUserResponse(user) : null;
  }

  async findLoginUserBySocailAccount(
    query: FindLoginUserBySocialAccountQuery,
  ): Promise<LoginUserResponse | null> {
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
    return users.length ? new LoginUserResponse(users[0]) : null;
  }
}
