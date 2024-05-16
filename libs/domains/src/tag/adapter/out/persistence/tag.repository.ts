import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { TagLoadPort } from '@lib/domains/tag/application/ports/out/tag.load.port';
import { TagSavePort } from '@lib/domains/tag/application/ports/out/tag.save.port';

@Injectable()
export class TagRepository extends PrismaRepository<TagEntity> implements TagLoadPort, TagSavePort {
  constructor() {
    super(TagEntity);
  }

  async findById(id: string): Promise<TagEntity | null> {
    const mannerTag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(mannerTag);
  }

  async create(mannerTag: TagEntity): Promise<void> {
    await this.prismaService.tag.create({
      data: _.pick(mannerTag, ['id', 'type', 'name', 'description', 'position']),
    });
  }

  async createMany(mannerTags: TagEntity[]): Promise<void> {
    await Promise.all(mannerTags.map((mannerTag) => this.create(mannerTag)));
  }

  async save(mannerTag: TagEntity): Promise<void> {
    await this.prismaService.tag.update({
      where: {
        id: mannerTag.id,
      },
      data: _.pick(mannerTag, 'type', 'name', 'description', 'position'),
    });
  }

  async delete(mannerTag: TagEntity): Promise<void> {
    await this.prismaService.tag.delete({
      where: {
        id: mannerTag.id,
      },
    });
  }
}
