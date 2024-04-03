import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { RoleSavePort } from '@lib/domains/role/application/ports/out/role.save.port';

@Injectable()
export class RoleRepository extends PrismaRepository<RoleEntity> implements RoleSavePort {
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
      data: _.pick(role, ['id', 'name', 'position', 'hexColor', 'groupId']),
    });
  }

  async createMany(roles: RoleEntity[]): Promise<void> {
    await this.prismaService.role.createMany({
      data: roles.map((role) => _.pick(role, ['id', 'name', 'position', 'hexColor', 'groupId'])),
    });
  }

  async save(role: RoleEntity): Promise<void> {
    await this.prismaService.role.update({
      where: {
        id: role.id,
      },
      data: _.pick(role, 'name', 'position', 'hexColor'),
    });
  }

  async delete(role: RoleEntity): Promise<void> {
    await this.prismaService.role.delete({
      where: {
        id: role.id,
      },
    });
  }

  async upsertRoles(roles: RoleEntity[]): Promise<void> {
    const rolePromises = roles.map((role) =>
      this.prismaService.role.upsert({
        where: {
          id: role.id,
        },
        create: {
          ..._.pick(role, 'id', 'name', 'position', 'hexColor', 'groupId'),
        },
        update: {
          ..._.pick(role, 'name', 'position', 'hexColor'),
        },
      }),
    );
    await Promise.all(rolePromises);
  }
}
