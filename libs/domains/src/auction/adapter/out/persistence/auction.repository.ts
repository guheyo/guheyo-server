import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';

@Injectable()
export class AuctionRepository extends PrismaRepository<AuctionEntity> {
  constructor() {
    super(AuctionEntity);
  }

  async findById(id: string): Promise<AuctionEntity | null> {
    const auction = await this.prismaService.auction.findUnique({
      where: {
        id,
      },
      include: {
        seller: {
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
    return this.toEntity(auction);
  }

  async create(auction: AuctionEntity): Promise<void> {
    await this.prismaService.auction.create({
      data: _.pick(auction, [
        'id',
        'createdAt',
        'endedAt',
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'guildId',
        'brandId',
        'productCategoryId',
        'sellerId',
        'status',
      ]),
    });
  }

  async createMany(auctions: AuctionEntity[]): Promise<void> {
    await this.prismaService.auction.createMany({
      data: auctions.map((auction) =>
        _.pick(auction, [
          'id',
          'createdAt',
          'endedAt',
          'name',
          'description',
          'price',
          'priceCurrency',
          'businessFunction',
          'guildId',
          'brandId',
          'productCategoryId',
          'sellerId',
          'status',
        ]),
      ),
    });
  }

  async save(auction: AuctionEntity): Promise<void> {
    await this.prismaService.auction.update({
      where: {
        id: auction.id,
      },
      data: _.pick(auction, [
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'guildId',
        'brandId',
        'productCategoryId',
        'sellerId',
        'status',
      ]),
    });
  }

  async delete(auction: AuctionEntity): Promise<void> {
    await this.prismaService.auction.delete({
      where: {
        id: auction.id,
      },
    });
  }
}
