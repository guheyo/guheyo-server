import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { OFFER_HIDDEN } from '@lib/domains/offer/domain/offer.constants';
import { Prisma } from '@prisma/client';
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
    let where: Prisma.OfferWhereInput;
    if (!!query.where?.sellerId && query.where.sellerId === query.userId) {
      where = query.where;
    } else {
      where = {
        ...query.where,
        AND: [
          {
            status: {
              notIn: [OFFER_HIDDEN],
            },
          },
          {
            status: query.where?.status,
          },
        ],
      };
    }

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const offers = await this.prismaService.offer.findMany({
      where: {
        ...where,
        name: parseFollowedBySearcher(query.keyword),
        bumpedAt: query.where?.bumpedAt
          ? {
              gt: new Date(query.where.bumpedAt.gt),
            }
          : undefined,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        seller: {
          select: {
            id: true,
            createdAt: true,
            username: true,
            avatarURL: true,
            bot: true,
          },
        },
      },
      orderBy: [
        {
          price: query.orderBy?.price,
        },
        {
          bumpedAt: query.orderBy?.bumpedAt,
        },
      ],
      distinct: query.distinct ? ['name', 'sellerId'] : undefined,
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
