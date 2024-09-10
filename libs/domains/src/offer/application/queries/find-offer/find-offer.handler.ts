import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { plainToInstance } from 'class-transformer';
import { FindOfferQuery } from './find-offer.query';
import { OfferResponse } from '../../dtos/offer.response';

@QueryHandler(FindOfferQuery)
export class FindOfferHandler extends PrismaQueryHandler {
  async execute(query: FindOfferQuery): Promise<OfferResponse | null> {
    if (!query.id && !query.slug) return null;

    const offer = await this.prismaService.offer.findFirst({
      where: {
        id: query.id,
        post: {
          slug: query.slug,
        },
      },
      include: {
        post: {
          include: {
            group: true,
            category: true,
            user: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
                socialAccounts: true,
              },
            },
            tags: true,
            reports: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_NOT_FOUND);
    if (offer.post.archivedAt && offer.post.userId !== query.userId)
      throw new ForbiddenException(OfferErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'offer',
        refId: offer.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return plainToInstance(OfferResponse, {
      ...offer,
      post: {
        ...offer.post,
        images,
        reportCount: offer.post.reports.length,
      },
    });
  }
}
