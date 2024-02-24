import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindOfferPreviewsQuery } from './find-offer-previews.query';
import { PaginatedOfferPreviewsResponse } from './paginated-offer-previews.response';
import { OfferPreviewResponse } from '../../dtos/offer-preview.response';

@QueryHandler(FindOfferPreviewsQuery)
export class FindOfferPreviewsHandler extends PrismaQueryHandler<
  FindOfferPreviewsQuery,
  OfferPreviewResponse
> {
  constructor() {
    super(OfferPreviewResponse);
  }

  async execute(query: FindOfferPreviewsQuery): Promise<PaginatedOfferPreviewsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const offers = await this.prismaService.offer.findMany({
      where: {
        ...query.where,
        name: parseFollowedBySearcher(query.keyword),
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        seller: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        {
          price: query.orderBy?.price,
        },
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });
    const offerPreviewPromises = offers.map(async (offer) => {
      const thumbnail = await this.prismaService.userImage.findFirst({
        where: {
          type: 'offer',
          refId: offer.id,
          tracked: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        ...offer,
        thumbnail,
      };
    });
    return paginate<OfferPreviewResponse>(
      this.parseResponses(await Promise.all(offerPreviewPromises)),
      'id',
      query.take,
    );
  }
}
