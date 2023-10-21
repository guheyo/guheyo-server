import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';

@Injectable()
export class DemandRepository extends PrismaRepository<DemandEntity> {
  constructor() {
    super(DemandEntity);
  }

  async findById(id: string): Promise<DemandEntity | null> {
    const demand = await this.prismaService.demand.findUnique({
      where: {
        id,
      },
      include: {
        buyer: {
          include: {
            socialAccounts: true,
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });
    return this.toEntity(demand);
  }

  async create(demand: DemandEntity): Promise<void> {
    await this.prismaService.demand.create({
      data: _.pick(demand, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'guildId',
        'brandId',
        'productCategoryId',
        'buyerId',
        'status',
        'source',
      ]),
    });
  }

  async createMany(demands: DemandEntity[]): Promise<void> {
    await this.prismaService.demand.createMany({
      data: demands.map((demand) =>
        _.pick(demand, [
          'id',
          'name',
          'description',
          'price',
          'priceCurrency',
          'businessFunction',
          'guildId',
          'brandId',
          'productCategoryId',
          'buyerId',
          'status',
          'source',
        ]),
      ),
    });
  }

  async save(demand: DemandEntity): Promise<void> {
    await this.prismaService.demand.update({
      where: {
        id: demand.id,
      },
      data: _.pick(demand, [
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'guildId',
        'brandId',
        'productCategoryId',
        'buyerId',
        'status',
      ]),
    });
  }

  async delete(demand: DemandEntity): Promise<void> {
    await this.prismaService.demand.delete({
      where: {
        id: demand.id,
      },
    });
  }
}
