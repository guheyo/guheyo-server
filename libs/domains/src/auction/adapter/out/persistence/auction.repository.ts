import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { BidSavePort } from '@lib/domains/auction/application/ports/out/bid.save.port';
import { BidEntity } from '@lib/domains/auction/domain/bid.entity';

@Injectable()
export class AuctionRepository extends PrismaRepository<AuctionEntity> implements BidSavePort {
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
        bids: {
          orderBy: {
            createdAt: 'desc',
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
        'businessFunction',
        'groupId',
        'brandId',
        'productCategoryId',
        'sellerId',
        'status',
        'source',
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
          'businessFunction',
          'groupId',
          'brandId',
          'productCategoryId',
          'sellerId',
          'status',
          'source',
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
        'businessFunction',
        'groupId',
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

  async addBid(bid: BidEntity): Promise<void> {
    await this.prismaService.auction.update({
      where: {
        id: bid.auctionId,
      },
      data: {
        bids: {
          create: _.pick(bid, ['id', 'price', 'priceCurrency', 'bidderId', 'status', 'source']),
        },
      },
    });
  }

  async cancelBid(bid: BidEntity): Promise<void> {
    await this.prismaService.auction.update({
      where: {
        id: bid.auctionId,
      },
      data: {
        bids: {
          update: {
            where: {
              id: bid.id,
            },
            data: _.pick(bid, 'canceledAt'),
          },
        },
      },
    });
  }
}
