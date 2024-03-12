import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { FindOfferQuery } from './find-offer.query';
import { OfferResponse } from '../../dtos/offer.response';

@QueryHandler(FindOfferQuery)
export class FindOfferHandler extends PrismaQueryHandler<FindOfferQuery, OfferResponse> {
  constructor() {
    super(OfferResponse);
  }

  async execute(query: FindOfferQuery): Promise<OfferResponse | null> {
    if (!query.id && !query.slug) return null;

    const offer = await this.prismaService.offer.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
      include: {
        group: true,
        seller: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'offer',
        refId: offer.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponse({
      ...offer,
      images,
    });
  }
}
