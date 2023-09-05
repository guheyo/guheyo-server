import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { UserLoadPort } from '@lib/domains/user/application/port/out/user.load.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserGetBySocialAccountQuery } from '@lib/domains/user/application/query/user-get-by-social-account/user.get-by-social-account.query';

@Injectable()
export class UserQueryRepository implements UserLoadPort {
  constructor(private prismaService: PrismaService) {}

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
    return user ? new UserEntity(user) : null;
  }

  async getBySocailAccount(query: UserGetBySocialAccountQuery): Promise<UserEntity | null> {
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
    return users.length ? new UserEntity(users[0]) : null;
  }
}
