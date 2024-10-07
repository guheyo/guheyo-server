import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindOfferPreviewQuery } from './find-offer-preview.query';
import { OfferPreviewResponse } from '../../dtos/offer-preview.response';

@QueryHandler(FindOfferPreviewQuery)
export class FindOfferPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindOfferPreviewQuery): Promise<OfferPreviewResponse | null> {
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
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
            tags: true,
            brands: true,
          },
        },
      },
    });

    return plainToInstance(OfferPreviewResponse, {
      ...offer,
      hasSubmittedReview: undefined,
    });
  }
}
