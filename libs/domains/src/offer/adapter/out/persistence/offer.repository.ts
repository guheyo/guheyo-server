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
        seller: {
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
          'name',
          'description',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
          'businessFunction',
          'groupId',
          'brandId',
          'productCategoryId',
          'sellerId',
          'status',
          'source',
        ]),
        bumpedAt: offer.createdAt,
      },
    });
  }

  async createMany(offers: OfferEntity[]): Promise<void> {
    await this.prismaService.offer.createMany({
      data: offers.map((offer) =>
        _.pick(offer, [
          'id',
          'name',
          'description',
          'price',
          'priceCurrency',
          'shippingCost',
          'shippingType',
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

  async save(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.update({
      where: {
        id: offer.id,
      },
      data: _.pick(offer, [
        'bumpedAt',
        'name',
        'description',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'groupId',
        'brandId',
        'productCategoryId',
        'sellerId',
        'status',
        'isHidden',
        'pending',
        'reportCount',
        'reportCommentCount',
      ]),
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
