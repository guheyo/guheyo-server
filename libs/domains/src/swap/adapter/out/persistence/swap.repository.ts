import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';

@Injectable()
export class SwapRepository extends PrismaRepository<SwapEntity> {
  constructor() {
    super(SwapEntity);
  }

  async findById(id: string): Promise<SwapEntity | null> {
    const swap = await this.prismaService.swap.findUnique({
      where: {
        id,
      },
      include: {
        proposer: {
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
        bumps: true,
      },
    });
    return this.toEntity(swap);
  }

  async create(swap: SwapEntity): Promise<void> {
    await this.prismaService.swap.create({
      data: _.pick(swap, [
        'id',
        'name0',
        'name1',
        'description0',
        'description1',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'groupId',
        'brandId',
        'productCategoryId',
        'proposerId',
        'status',
        'source',
      ]),
    });
  }

  async createMany(swaps: SwapEntity[]): Promise<void> {
    await this.prismaService.swap.createMany({
      data: swaps.map((swap) =>
        _.pick(swap, [
          'id',
          'name0',
          'name1',
          'description0',
          'description1',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'businessFunction',
          'groupId',
          'brandId',
          'productCategoryId',
          'proposerId',
          'status',
          'source',
        ]),
      ),
    });
  }

  async save(swap: SwapEntity): Promise<void> {
    await this.prismaService.swap.update({
      where: {
        id: swap.id,
      },
      data: _.pick(swap, [
        'bumpedAt',
        'name0',
        'name1',
        'description0',
        'description1',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'groupId',
        'brandId',
        'productCategoryId',
        'proposerId',
        'status',
        'isHidden',
        'pending',
        'reportCount',
        'reportCommentCount',
      ]),
    });
  }

  async delete(swap: SwapEntity): Promise<void> {
    await this.prismaService.swap.delete({
      where: {
        id: swap.id,
      },
    });
  }
}
