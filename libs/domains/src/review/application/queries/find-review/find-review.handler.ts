import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewErrorMessage } from '@lib/domains/review/domain/review.error.message';
import { FindReviewQuery } from './find-review.query';
import { ReviewDetailResponse } from '../../dtos/review-detail.response';

@QueryHandler(FindReviewQuery)
export class FindReviewHandler extends PrismaQueryHandler {
  async execute(query: FindReviewQuery): Promise<ReviewDetailResponse | null> {
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
            brands: true,
            reports: {
              select: {
                id: true,
              },
            },
          },
        },
        product: true,
      },
    });
    if (!review) throw new NotFoundException(ReviewErrorMessage.REVIEW_NOT_FOUND);

    return plainToInstance(ReviewDetailResponse, {
      ...review,
    });
  }
}
