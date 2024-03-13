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
      : query.type && (query.postId || query.reportId || query.auctionId)
      ? {
          type: query.type,
          postId: query.postId,
          reportId: query.reportId,
          auctionId: query.auctionId,
        }
      : null;
    if (!where) throw new NotFoundException(CommentErrorMessage.COMMENT_IS_NOT_FOUND);

    const comment = await this.prismaService.comment.findFirst({
      where,
      include: {
        author: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    return this.parseResponse(comment);
  }
}
