import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { BidSavePort } from '@lib/domains/auction/application/ports/out/bid.save.port';
import { BidEntity } from '@lib/domains/auction/domain/bid.entity';
import { AuctionSavePort } from '@lib/domains/auction/application/ports/out/auction.save.port';
import { AuctionLoadPort } from '@lib/domains/auction/application/ports/out/auction.load.port';

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
                members: {
                  include: {
                    group: true,
                    roles: {
                      orderBy: {
                        position: 'asc',
                      },
                    },
                  },
                },
              },
            },
            tags: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
        bids: {
          include: {
            user: {
              include: {
                socialAccounts: true,
                members: {
                  include: {
                    group: true,
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
          orderBy: {
            createdAt: 'desc',
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
          'type',
          'title',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
      },
    });
    await this.prismaService.auction.create({
      data: {
        ..._.pick(auction, [
          'id',
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
    await auctions.map(async (auction) => this.create(auction));
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
          'extensionCount',
          'content',
          'currentBidPrice',
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
}
