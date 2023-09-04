import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '@lib/shared';
import { UserSavePort } from '@lib/domains/user/application/port/out/user.save.port';
import { SocialAccountSavePort } from '@lib/domains/user/application/port/out/social-account.save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '@lib/domains/user/application/command/social-account-delete/social-account.delete.command';

@Injectable()
export class UserCommandRepository implements UserSavePort, SocialAccountSavePort {
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

  async deleteSocialAccount(command: SocialAccountDeleteCommand): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: command.userId,
      },
      data: {
        socialAccounts: {
          deleteMany: {
            provider: command.provider,
            socialId: command.socialId,
          },
        },
      },
    });
  }
}
