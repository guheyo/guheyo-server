import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';

@Injectable()
export class RoleRepository extends PrismaRepository<RoleEntity> {
  constructor() {
    super(RoleEntity);
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(role);
  }

  async create(role: RoleEntity): Promise<void> {
    await this.prismaService.role.create({
      data: _.pick(role, ['id', 'name', 'rank', 'hexColor', 'guildId']),
    });
  }

  async save(role: RoleEntity): Promise<void> {
    await this.prismaService.role.update({
      where: {
        id: role.id,
      },
      data: _.pick(role, 'name', 'rank', 'hexColor'),
    });
  }

  async delete(role: RoleEntity): Promise<void> {
    await this.prismaService.role.delete({
      where: {
        id: role.id,
      },
    });
  }
}
