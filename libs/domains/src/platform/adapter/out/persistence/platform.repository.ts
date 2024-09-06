import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { PlatformEntity } from '@lib/domains/platform/domain/platform.entity';
import { PlatformLoadPort } from '@lib/domains/platform/application/ports/out/platform.load.port';
import { PlatformSavePort } from '@lib/domains/platform/application/ports/out/platform.save.port';

@Injectable()
export class PlatformRepository
  extends PrismaRepository<PlatformEntity>
  implements PlatformLoadPort, PlatformSavePort
{
  constructor() {
    super(PlatformEntity);
  }

  async findById(id: string): Promise<PlatformEntity | null> {
    const mannerTag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(mannerTag);
  }

  async create(mannerTag: PlatformEntity): Promise<void> {
    await this.prismaService.tag.create({
      data: _.pick(mannerTag, ['id', 'type', 'name', 'description', 'position']),
    });
  }

  async createMany(mannerTags: PlatformEntity[]): Promise<void> {
    await Promise.all(mannerTags.map((mannerTag) => this.create(mannerTag)));
  }

  async save(mannerTag: PlatformEntity): Promise<void> {
    await this.prismaService.tag.update({
      where: {
        id: mannerTag.id,
      },
      data: _.pick(mannerTag, 'type', 'name', 'description', 'position'),
    });
  }

  async delete(mannerTag: PlatformEntity): Promise<void> {
    await this.prismaService.tag.delete({
      where: {
        id: mannerTag.id,
      },
    });
  }
}
