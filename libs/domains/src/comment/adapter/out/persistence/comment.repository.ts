import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';

@Injectable()
export class CommentRepository extends PrismaRepository<CommentEntity> {
  constructor() {
    super(CommentEntity);
  }

  async findById(id: string): Promise<CommentEntity | null> {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return this.toEntity(comment);
  }

  async create(comment: CommentEntity): Promise<void> {
    await this.prismaService.comment.create({
      data: _.pick(comment, [
        'id',
        'type',
        'authorId',
        'content',
        'source',
        'parentId',
        'postId',
        'reportId',
        'auctionId',
      ]),
    });
  }

  async createMany(comments: CommentEntity[]): Promise<void> {
    await this.prismaService.comment.createMany({
      data: comments.map((comment) =>
        _.pick(comment, [
          'id',
          'type',
          'authorId',
          'content',
          'source',
          'parentId',
          'postId',
          'reportId',
          'auctionId',
        ]),
      ),
    });
  }

  async save(comment: CommentEntity): Promise<void> {
    await this.prismaService.comment.update({
      where: {
        id: comment.id,
      },
      data: _.pick(comment, ['content']),
    });
  }

  async delete(comment: CommentEntity): Promise<void> {
    await this.prismaService.comment.delete({
      where: {
        id: comment.id,
      },
    });
  }
}
