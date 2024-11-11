import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { ReviewErrorMessage } from '@lib/domains/review/domain/review.error.message';
import { plainToInstance } from 'class-transformer';
import { FindReviewPreviewQuery } from './find-review-preview.query';
import { ReviewPreviewResponse } from '../../dtos/review-preview.response';

@QueryHandler(FindReviewPreviewQuery)
export class FindReviewPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindReviewPreviewQuery): Promise<ReviewPreviewResponse | null> {
    if (!query.id) return null;

    const review = await this.prismaService.review.findFirst({
      where: {
        id: query.id,
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
        product: true,
      },
    });
    if (!review) throw new NotFoundException(ReviewErrorMessage.REVIEW_NOT_FOUND);

    return plainToInstance(ReviewPreviewResponse, {
      ...review,
    });
  }
}
