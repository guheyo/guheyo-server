import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { PrismaService } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class UserQueryRepository {
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

  async getBySocialAccount(provider: string, socialId: string): Promise<UserEntity | null> {
    const users = await this.prismaService.user.findMany({
      where: {
        socialAccounts: {
          some: {
            provider,
            socialId,
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
