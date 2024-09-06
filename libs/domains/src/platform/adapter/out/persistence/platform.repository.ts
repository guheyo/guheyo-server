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
    const platform = await this.prismaService.platform.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(platform);
  }

  async create(platform: PlatformEntity): Promise<void> {
    await this.prismaService.platform.create({
      data: _.pick(platform, ['id', 'name', 'description', 'logo']),
    });
  }

  async createMany(platforms: PlatformEntity[]): Promise<void> {
    await Promise.all(platforms.map((platform) => this.create(platform)));
  }

  async save(platform: PlatformEntity): Promise<void> {
    await this.prismaService.platform.update({
      where: {
        id: platform.id,
      },
      data: _.pick(platform, 'name', 'description', 'logo'),
    });
  }

  async delete(platform: PlatformEntity): Promise<void> {
    await this.prismaService.platform.delete({
      where: {
        id: platform.id,
      },
    });
  }
}
