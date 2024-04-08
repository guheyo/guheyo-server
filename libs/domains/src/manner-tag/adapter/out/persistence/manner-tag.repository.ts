import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { MannerTagEntity } from '@lib/domains/manner-tag/domain/manner-tag.entity';
import { MannerTagLoadPort } from '@lib/domains/manner-tag/application/ports/out/manner-tag.load.port';
import { MannerTagSavePort } from '@lib/domains/manner-tag/application/ports/out/manner-tag.save.port';

@Injectable()
export class MannerTagRepository
  extends PrismaRepository<MannerTagEntity>
  implements MannerTagLoadPort, MannerTagSavePort
{
  constructor() {
    super(MannerTagEntity);
  }

  async findById(id: string): Promise<MannerTagEntity | null> {
    const mannerTag = await this.prismaService.mannerTag.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(mannerTag);
  }

  async create(mannerTag: MannerTagEntity): Promise<void> {
    await this.prismaService.mannerTag.create({
      data: _.pick(mannerTag, ['id', 'name', 'description', 'isPositive', 'position']),
    });
  }

  async createMany(mannerTags: MannerTagEntity[]): Promise<void> {
    await this.prismaService.mannerTag.createMany({
      data: mannerTags.map((mannerTag) =>
        _.pick(mannerTag, ['id', 'name', 'description', 'isPositive', 'position']),
      ),
    });
  }

  async save(mannerTag: MannerTagEntity): Promise<void> {
    await this.prismaService.mannerTag.update({
      where: {
        id: mannerTag.id,
      },
      data: _.pick(mannerTag, 'name', 'description', 'isPositive', 'position'),
    });
  }

  async delete(mannerTag: MannerTagEntity): Promise<void> {
    await this.prismaService.mannerTag.delete({
      where: {
        id: mannerTag.id,
      },
    });
  }
}
