import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { UserLoadPort } from '@lib/domains/user/application/ports/out/user.load.port';

@Injectable()
export class UserRepository extends PrismaRepository<UserEntity> implements UserLoadPort {
  constructor() {
    super(UserEntity);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
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
        members: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });

    return this.toEntity(users[0]);
  }

  async create(user: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: _.pick(user, 'id', 'username', 'name', 'phoneNumber', 'avatarURL'),
    });
  }

  async createMany(users: UserEntity[]): Promise<void> {
    await this.prismaService.user.createMany({
      data: users.map((user) => _.pick(user, 'id', 'username', 'name', 'phoneNumber', 'avatarURL')),
    });
  }

  async save(user: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: _.pick(user, ['username', 'name', 'phoneNumber', 'avatarURL']),
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
