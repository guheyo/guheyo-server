import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
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
    if (!!query.where?.userId && query.where.userId !== query.userId && query.where?.isArchived)
      throw new ForbiddenException(OfferErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    const where: Prisma.OfferWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            userId: query.where.userId,
            pending: query.where.pending,
            archivedAt: query.where.isArchived
              ? {
                  not: null,
                }
              : {
                  equals: null,
                },
            title: parseFollowedBySearcher(query.keyword),
          },
          status: query.where.status,
          bumpedAt: query.where?.bumpedAt
            ? {
                gt: new Date(query.where.bumpedAt.gt),
              }
            : undefined,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const offers = await this.prismaService.offer.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            user: {
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
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
    });

    return paginate<OfferPreviewResponse>(this.parseResponses(offers), 'id', query.take);
  }
}
