import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '@lib/shared';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserLoadPort } from '@lib/domains/user/application/ports/out/user.load';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRepository implements UserLoadPort, SavePort<UserEntity> {
  constructor(readonly prismaService: PrismaService) {}

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: {
              orderBy: {
                rank: 'asc',
              },
            },
          },
        },
      },
    });

    return user ? plainToClass(UserEntity, user) : null;
  }

  async findUserBySocialAccount(provider: string, socialId: string): Promise<UserEntity | null> {
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
            roles: {
              orderBy: {
                rank: 'asc',
              },
            },
          },
        },
      },
    });

    return users.length ? plainToClass(UserEntity, users[0]) : null;
  }

  async create(user: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: _.pick(user, 'id', 'username'),
    });
  }

  async update(user: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: _.omit(user, ['id', 'socialAccounts', 'members']),
    });
  }

  async delete(user: UserEntity): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
