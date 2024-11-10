import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ReviewEntity } from '@lib/domains/review/domain/review.entity';
import { ReviewLoadPort } from '@lib/domains/review/application/ports/out/review.load.port';
import { ReviewSavePort } from '@lib/domains/review/application/ports/out/review.save.port';

@Injectable()
export class ReviewRepository
  extends PrismaRepository<ReviewEntity>
  implements ReviewLoadPort, ReviewSavePort
{
  constructor() {
    super(ReviewEntity);
  }

  async findById(id: string): Promise<ReviewEntity | null> {
    const product = await this.prismaService.review.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(product);
  }

  async create(review: ReviewEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        id: review.post.id,
        createdAt: review.post.createdAt,
        updatedAt: review.post.updatedAt,
        type: review.post.type,
        title: review.post.title,
        thumbnail: review.post.thumbnail,
        userAgent: review.post.userAgent,
        ipAddress: review.post.ipAddress,
        groupId: review.post.groupId,
        categoryId: review.post.categoryId,
        userId: review.post.userId,
        brands: review.post.brandId ? { connect: { id: review.post.brandId } } : undefined,
      },
    });
    await this.prismaService.review.create({
      data: {
        postId: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        id: review.id,
        content: review.content,
        rating: review.rating,
        status: review.status,
        productId: review.productId,
      },
    });
  }

  async createMany(products: ReviewEntity[]): Promise<void> {
    await Promise.all(products.map((product) => this.create(product)));
  }

  async save(review: ReviewEntity): Promise<void> {
    await this.prismaService.review.update({
      where: {
        id: review.id,
      },
      data: {
        post: {
          update: {
            archivedAt: review.post.archivedAt,
            pending: review.post.pending,
            title: review.post.title,
            categoryId: review.post.categoryId,
            brands: {
              set: review.post.brandId ? [{ id: review.post.brandId }] : [],
            },
          },
        },
        content: review.content,
        rating: review.rating,
        status: review.status,
      },
    });
  }

  async delete(review: ReviewEntity): Promise<void> {
    await this.prismaService.review.delete({
      where: {
        id: review.id,
      },
    });
  }
}
