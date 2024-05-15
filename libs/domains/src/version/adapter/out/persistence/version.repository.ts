import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { VersionEntity } from '@lib/domains/version/domain/version.entity';

@Injectable()
export class VersionRepository extends PrismaRepository<VersionEntity> {
  constructor() {
    super(VersionEntity);
  }

  async findById(id: string): Promise<VersionEntity | null> {
    const version = await this.prismaService.version.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(version);
  }

  async create(version: VersionEntity): Promise<void> {
    await this.prismaService.version.create({
      data: _.pick(version, ['id', 'schemaName', 'tableName', 'op', 'refId', 'values']),
    });
  }

  async createMany(versions: VersionEntity[]): Promise<void> {
    await Promise.all(versions.map((version) => this.create(version)));
  }

  async save(version: VersionEntity): Promise<void> {
    await this.prismaService.version.update({
      where: {
        id: version.id,
      },
      data: _.pick(version, ['values']),
    });
  }

  async delete(version: VersionEntity): Promise<void> {
    await this.prismaService.version.delete({
      where: {
        id: version.id,
      },
    });
  }
}
