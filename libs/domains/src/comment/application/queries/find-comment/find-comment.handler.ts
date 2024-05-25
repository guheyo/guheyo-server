import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindCommentQuery } from './find-comment.query';
import { CommentResponse } from '../../dtos/comment.response';

@QueryHandler(FindCommentQuery)
export class FindCommentHandler extends PrismaQueryHandler {
  async execute(query: FindCommentQuery): Promise<CommentResponse | null> {
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id: query.id,
        postId: query.postId,
      },
      include: {
        reactions: {
          where: {
            canceledAt: null,
          },
          include: {
            emoji: true,
          },
        },
      },
    });
    return plainToClass(CommentResponse, comment);
  }
}
