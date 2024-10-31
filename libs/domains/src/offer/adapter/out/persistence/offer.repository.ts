import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { OfferSavePort } from '@lib/domains/offer/application/ports/out/offer.save.port';
import { OfferLoadPort } from '@lib/domains/offer/application/ports/out/offer.load.port';

@Injectable()
export class OfferRepository
  extends PrismaRepository<OfferEntity>
  implements OfferLoadPort, OfferSavePort
{
  constructor() {
    super(OfferEntity);
  }

  async findById(id: string): Promise<OfferEntity | null> {
    const offer = await this.prismaService.offer.findUnique({
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
        bumps: true,
      },
    });
    return this.toEntity(offer);
  }

  async create(offer: OfferEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        ..._.pick(offer.post, [
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
        brands:
          offer.post.brands.length > 0
            ? { connect: offer.post.brands.map((brand) => ({ id: brand.id })) }
            : undefined,
      },
    });
    await this.prismaService.offer.create({
      data: {
        ..._.pick(offer, [
          'id',
          'businessFunction',
          'name0',
          'name1',
          'content',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'status',
        ]),
        postId: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        bumpedAt: post.createdAt,
      },
    });
  }

  async createMany(offers: OfferEntity[]): Promise<void> {
    await Promise.all(offers.map(async (offer) => this.create(offer)));
  }

  async save(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.update({
      where: {
        id: offer.id,
      },
      data: {
        post: {
          update: {
            ..._.pick(offer.post, ['archivedAt', 'pending', 'title', 'categoryId']),
          },
        },
        ..._.pick(offer, [
          'bumpedAt',
          'name0',
          'name1',
          'content',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'status',
        ]),
      },
    });
  }

  async delete(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.delete({
      where: {
        id: offer.id,
      },
    });
  }
}
