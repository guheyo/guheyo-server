import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { FindOfferByIdQuery } from './find-offer-by-id.query';
import { OfferResponse } from '../../dtos/offer.response';

@QueryHandler(FindOfferByIdQuery)
export class FindOfferByIdHandler extends PrismaQueryHandler<FindOfferByIdQuery, OfferResponse> {
  constructor() {
    super(OfferResponse);
  }

  async execute(query: FindOfferByIdQuery): Promise<any> {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id: query.id,
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
