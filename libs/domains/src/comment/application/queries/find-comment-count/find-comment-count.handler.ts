import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindCommentCountQuery } from './find-comment-count.query';
import { CommentCountResponse } from '../../dtos/comment-count.response';

@QueryHandler(FindCommentCountQuery)
export class FindCommentCountHandler extends PrismaQueryHandler {
  async execute(query: FindCommentCountQuery): Promise<CommentCountResponse> {
    const count = await this.prismaService.comment.count({
      where: {
        postId: query.postId,
        deletedAt: null,
      },
    });

    return plainToInstance(CommentCountResponse, {
      postId: query.postId,
      count,
    });
  }
}
