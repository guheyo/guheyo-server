import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { UserLoadPort } from '@lib/domains/user/application/ports/out/user.load.port';
import { UserSavePort } from '@lib/domains/user/application/ports/out/user.save.port';

@Injectable()
export class UserRepository
  extends PrismaRepository<UserEntity>
  implements UserLoadPort, UserSavePort
{
  constructor() {
    super(UserEntity);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        socialAccounts: true,
        roles: {
          include: {
            group: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    return this.toEntity(user);
  }

  async findBySocialAccount(provider: string, socialId: string): Promise<UserEntity | null> {
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
        roles: {
          include: {
            group: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    return this.toEntity(users[0]);
  }

  async create(user: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: _.pick(user, 'id', 'username', 'name', 'about', 'phoneNumber', 'avatarURL'),
    });
  }

  async createMany(users: UserEntity[]): Promise<void> {
    await Promise.all(users.map((user) => this.create(user)));
  }

  async save(user: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: _.pick(user, ['username', 'name', 'about', 'phoneNumber', 'avatarURL']),
    });
  }

  async delete(user: UserEntity): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async connectRoles({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: string;
    roleIds: string[];
    roleNames: string[];
  }): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect:
            roleIds.length > 0
              ? roleIds.map((roleId) => ({
                  id: roleId,
                }))
              : roleNames.map((roleName) => ({
                  name: roleName,
                })),
        },
      },
    });
  }

  async disconnectRoles({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: string;
    roleIds: string[];
    roleNames: string[];
  }): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          disconnect:
            roleIds.length > 0
              ? roleIds.map((roleId) => ({
                  id: roleId,
                }))
              : roleNames.map((roleName) => ({
                  name: roleName,
                })),
        },
      },
    });
  }
}
