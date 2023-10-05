import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';

@Injectable()
export class OfferRepository extends PrismaRepository<OfferEntity> {
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
    return this.toEntity(offer);
  }

  async create(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.create({
      data: _.pick(offer, [
        'id',
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

  async createMany(offers: OfferEntity[]): Promise<void> {
    await this.prismaService.offer.createMany({
      data: offers.map((offer) =>
        _.pick(offer, [
          'id',
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

  async save(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.update({
      where: {
        id: offer.id,
      },
      data: _.pick(offer, [
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

  async delete(offer: OfferEntity): Promise<void> {
    await this.prismaService.offer.delete({
      where: {
        id: offer.id,
      },
    });
  }
}
