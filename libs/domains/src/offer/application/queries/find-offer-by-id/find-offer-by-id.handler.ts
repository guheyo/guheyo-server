import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { FindOfferByIdQuery } from './find-offer-by-id.query';
import { OfferResponse } from '../../dtos/offer.response';

@QueryHandler(FindOfferByIdQuery)
export class FindOfferByIdHandler implements IQueryHandler<FindOfferByIdQuery> {
  constructor(private prismaService: PrismaService) {}

  async execute(query: FindOfferByIdQuery): Promise<any> {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id: query.id,
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

    return offer
      ? plainToClass(OfferResponse, {
          ...offer,
          images,
        })
      : null;
  }
}
