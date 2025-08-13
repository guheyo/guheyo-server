import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { BidSavePort } from '@lib/domains/auction/application/ports/out/bid.save.port';
import { BidEntity } from '@lib/domains/auction/domain/bid.entity';
import { AuctionSavePort } from '@lib/domains/auction/application/ports/out/auction.save.port';
import { AuctionLoadPort } from '@lib/domains/auction/application/ports/out/auction.load.port';
import { BID, REJECTED } from '@lib/domains/auction/domain/bid.constants';

@Injectable()
export class AuctionRepository
  extends PrismaRepository<AuctionEntity>
  implements AuctionSavePort, AuctionLoadPort, BidSavePort
{
  constructor() {
    super(AuctionEntity);
  }

  async findById(id: string): Promise<AuctionEntity | null> {
    const auction = await this.prismaService.auction.findUnique({
      where: {
        id,
      },
      include: {
        post: {
          include: {
            user: {
              include: {
                socialAccounts: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            tags: {
              orderBy: {
                position: 'asc',
              },
            },
            brands: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
        bids: {
          include: {
            user: {
              include: {
                socialAccounts: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return this.toEntity(auction);
  }

  async create(auction: AuctionEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        ..._.pick(auction.post, [
          'id',
          'createdAt',
          'updatedAt',
          'type',
          'title',
          'thumbnail',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
        brands: auction.post.brandId ? { connect: { id: auction.post.brandId } } : undefined,
      },
    });
    await this.prismaService.auction.create({
      data: {
        ..._.pick(auction, [
          'id',
          'createdAt',
          'originalEndDate',
          'extendedEndDate',
          'content',
          'shippingCost',
          'shippingType',
          'status',
        ]),
        postId: post.id,
      },
    });
  }

  async createMany(auctions: AuctionEntity[]): Promise<void> {
    await Promise.all(auctions.map((auction) => this.create(auction)));
  }

  async save(auction: AuctionEntity): Promise<void> {
    await this.prismaService.auction.update({
      where: {
        id: auction.id,
      },
      data: {
        post: {
          update: {
            ..._.pick(auction.post, ['pending']),
          },
        },
        ..._.pick(auction, [
          'id',
          'extendedEndDate',
          'version',
          'content',
          'hammerPrice',
          'status',
        ]),
      },
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
          create: _.pick(bid, ['id', 'price', 'priceCurrency', 'userId', 'status']),
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

  async rejectBids(userId: string): Promise<void> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    await this.prismaService.bid.updateMany({
      where: {
        userId,
        status: BID,
        canceledAt: null,
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      data: {
        status: REJECTED,
      },
    });
  }
}
