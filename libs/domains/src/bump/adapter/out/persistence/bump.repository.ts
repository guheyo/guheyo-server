import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';

@Injectable()
export class BumpRepository extends PrismaRepository<BumpEntity> {
  constructor() {
    super(BumpEntity);
  }

  async findById(id: string): Promise<BumpEntity | null> {
    const bump = await this.prismaService.bump.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(bump);
  }

  async create(bump: BumpEntity): Promise<void> {
    await this.prismaService.bump.create({
      data: _.pick(bump, ['id', 'offerId', 'oldPrice', 'newPrice']),
    });
  }

  async createMany(bumps: BumpEntity[]): Promise<void> {
    await this.prismaService.bump.createMany({
      data: bumps.map((bump) => _.pick(bump, ['id', 'offerId', 'oldPrice', 'newPrice'])),
    });
  }

  async save(bump: BumpEntity): Promise<void> {
    await this.prismaService.bump.update({
      where: {
        id: bump.id,
      },
      data: _.pick(bump, ['oldPrice', 'newPrice']),
    });
  }

  async delete(bump: BumpEntity): Promise<void> {
    await this.prismaService.bump.delete({
      where: {
        id: bump.id,
      },
    });
  }
}
