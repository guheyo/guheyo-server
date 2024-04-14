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
        },
        bumps: true,
      },
    });
    return this.toEntity(offer);
  }

  async create(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.create({
      data: {
        ..._.pick(offer, [
          'id',
          'createdAt',
          'updatedAt',
          'businessFunction',
          'name0',
          'name1',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'status',
        ]),
        post: {
          create: {
            ..._.pick(offer.post, [
              'type',
              'title',
              'content',
              'userAgent',
              'ipAddress',
              'groupId',
              'categoryId',
              'userId',
            ]),
          },
        },
      },
    });
  }

  async createMany(offers: OfferEntity[]): Promise<void> {
    await this.prismaService.offer.createMany({
      data: offers.map((offer) => ({
        ..._.pick(offer, [
          'id',
          'createdAt',
          'updatedAt',
          'businessFunction',
          'name0',
          'name1',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'status',
        ]),
        postId: offer.post.id,
        post: {
          create: {
            ..._.pick(offer.post, [
              'type',
              'title',
              'content',
              'userAgent',
              'ipAddress',
              'groupId',
              'categoryId',
              'userId',
            ]),
          },
        },
      })),
    });
  }

  async save(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.update({
      where: {
        id: offer.id,
      },
      data: {
        ..._.pick(offer, [
          'bumpedAt',
          'name0',
          'name1',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'status',
        ]),
        post: {
          update: {
            ..._.pick(offer.post, ['archivedAt', 'pending', 'title', 'content', 'categoryId']),
          },
        },
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
