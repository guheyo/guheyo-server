import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindOffersQuery } from './find-offers.query';
import { OfferResponse } from '../../dtos/offer.response';
import { PaginatedOffersResponse } from './paginated-offers.response';

@QueryHandler(FindOffersQuery)
export class FindOffersHandler extends PrismaQueryHandler<FindOffersQuery, OfferResponse> {
  constructor() {
    super(OfferResponse);
  }

  async execute(query: FindOffersQuery): Promise<PaginatedOffersResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const offers = await this.prismaService.offer.findMany({
      where: query.where,
      cursor,
      take: query.take,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
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
          },
        },
      },
    });
    const offerWithImagesPromises = offers.map(async (offer) => ({
      ...offer,
      images: await this.prismaService.userImage.findMany({
        where: {
          type: 'offer',
          refId: offer.id,
          tracked: true,
        },
      }),
    }));
    return paginate<OfferResponse>(
      this.parseResponses(await Promise.all(offerWithImagesPromises)),
      'id',
      query.take,
    );
  }
}
