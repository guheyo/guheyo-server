import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '@lib/shared';
import { UserSavePort } from '@lib/domains/user/application/port/out/user.save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

@Injectable()
export class UserCommandRepository implements UserSavePort {
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
}
