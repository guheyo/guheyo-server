import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { PrismaService } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class UserCommandRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: _.pick(user, 'id', 'username'),
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  async update(user: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: _.omit(user, ['id', 'socialAccounts', 'members']),
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async createSocialAccount(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: socialAccount.userId,
      },
      data: {
        socialAccounts: {
          create: socialAccount,
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
  }

  async updateSocialAccount(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: socialAccount.userId,
      },
      data: {
        socialAccounts: {
          updateMany: {
            where: {
              provider: socialAccount.provider,
              socialId: socialAccount.socialId,
            },
            data: socialAccount,
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
  }

  async deleteSocialAccount(userId: string, provider: string, socialId: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        socialAccounts: {
          deleteMany: {
            provider,
            socialId,
          },
        },
      },
    });
  }
}
