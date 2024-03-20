import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { FindCommentQuery } from './find-comment.query';
import { CommentResponse } from '../../dtos/comment.response';

@QueryHandler(FindCommentQuery)
export class FindCommentHandler extends PrismaQueryHandler<FindCommentQuery, CommentResponse> {
  constructor() {
    super(CommentResponse);
  }

  async execute(query: FindCommentQuery): Promise<CommentResponse | null> {
    const where = query.id
      ? {
          id: query.id,
        }
      : query.type
      ? {
          type: query.type,
          postId: query.type === 'post' ? query.refId : undefined,
          reportId: query.type === 'report' ? query.refId : undefined,
          auctionId: query.type === 'auction' ? query.refId : undefined,
        }
      : undefined;
    if (!where) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);

    const comment = await this.prismaService.comment.findFirst({
      where,
    });
    return this.parseResponse(comment);
  }
}
