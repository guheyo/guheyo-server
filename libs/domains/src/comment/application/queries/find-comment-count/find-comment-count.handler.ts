import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindCommentCountQuery } from './find-comment-count.query';
import { CommentCountResponse } from '../../dtos/comment-count.response';

@QueryHandler(FindCommentCountQuery)
export class FindCommentCountHandler extends PrismaQueryHandler {
  async execute(query: FindCommentCountQuery): Promise<CommentCountResponse> {
    const comments = await this.prismaService.comment.findMany({
      where: {
        postId: query.postId,
      },
      select: {
        id: true,
        postId: true,
      },
    });

    return plainToClass(CommentCountResponse, {
      postId: query.postId,
      count: comments.length,
    });
  }
}
