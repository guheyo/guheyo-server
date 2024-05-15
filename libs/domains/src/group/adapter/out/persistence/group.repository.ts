import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';

@Injectable()
export class GroupRepository extends PrismaRepository<GroupEntity> {
  constructor() {
    super(GroupEntity);
  }

  async findById(id: string): Promise<GroupEntity | null> {
    const group = await this.prismaService.group.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return this.toEntity(group);
  }

  async create(group: GroupEntity): Promise<void> {
    await this.prismaService.group.create({
      data: _.pick(group, ['id', 'name', 'slug', 'description', 'icon', 'position']),
    });
  }

  async createMany(groups: GroupEntity[]): Promise<void> {
    await Promise.all(groups.map((group) => this.create(group)));
  }

  async save(group: GroupEntity): Promise<void> {
    await this.prismaService.group.update({
      where: {
        id: group.id,
      },
      data: _.pick(group, ['name', 'slug', 'description', 'icon', 'position']),
    });
  }

  async delete(group: GroupEntity): Promise<void> {
    await this.prismaService.group.delete({
      where: {
        id: group.id,
      },
    });
  }
}
