import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { DealReviewEntity } from '@lib/domains/deal-review/domain/deal-review.entity';
import { DealReviewLoadPort } from '@lib/domains/deal-review/application/ports/out/deal-review.load.port';
import { DealReviewSavePort } from '@lib/domains/deal-review/application/ports/out/deal-review.save.port';

@Injectable()
export class DealReviewRepository
  extends PrismaRepository<DealReviewEntity>
  implements DealReviewLoadPort, DealReviewSavePort
{
  constructor() {
    super(DealReviewEntity);
  }

  async findById(id: string): Promise<DealReviewEntity | null> {
    const dealReview = await this.prismaService.dealReview.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        refVersion: true,
      },
    });
    return this.toEntity(dealReview);
  }

  async findLastDealReview({
    refId,
    authorId,
    revieweeId,
  }: {
    refId: string;
    authorId: string;
    revieweeId: string;
  }): Promise<DealReviewEntity | null> {
    const dealReview = await this.prismaService.dealReview.findFirst({
      where: {
        refId,
        authorId,
        revieweeId,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        refVersion: true,
      },
    });
    return this.toEntity(dealReview);
  }

  async create(dealReview: DealReviewEntity): Promise<void> {
    await this.prismaService.dealReview.create({
      data: _.pick(dealReview, [
        'id',
        'type',
        'refId',
        'refVersionId',
        'authorId',
        'revieweeId',
        'groupId',
        'title',
        'content',
        'status',
      ]),
    });
  }

  async createMany(dealReviews: DealReviewEntity[]): Promise<void> {
    await this.prismaService.dealReview.createMany({
      data: dealReviews.map((dealReview) =>
        _.pick(dealReview, [
          'id',
          'type',
          'refId',
          'refVersionId',
          'authorId',
          'revieweeId',
          'groupId',
          'title',
          'content',
          'status',
        ]),
      ),
    });
  }

  async save(dealReview: DealReviewEntity): Promise<void> {
    await this.prismaService.dealReview.update({
      where: {
        id: dealReview.id,
      },
      data: _.pick(dealReview, ['title', 'content', 'status']),
    });
  }

  async delete(dealReview: DealReviewEntity): Promise<void> {
    await this.prismaService.dealReview.delete({
      where: {
        id: dealReview.id,
      },
    });
  }

  async connectMannerTags(reviewId: string, tagIds: string[]): Promise<void> {
    await this.prismaService.dealReview.update({
      where: {
        id: reviewId,
      },
      data: {
        mannerTags: {
          connect: tagIds.map((id) => ({
            id,
          })),
        },
      },
    });
  }
}
