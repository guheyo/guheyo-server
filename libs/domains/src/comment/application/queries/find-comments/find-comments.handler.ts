import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { COMMENT } from '@lib/domains/comment/domain/comment.constants';
import { FindCommentsQuery } from './find-comments.query';
import { PaginatedCommentsResponse } from './paginated-comments.response';
import { CommentWithAuthorResponse } from '../../dtos/comment-with-author.response';

@QueryHandler(FindCommentsQuery)
export class FindCommentsHandler extends PrismaQueryHandler {
  async execute(query: FindCommentsQuery): Promise<PaginatedCommentsResponse> {
    const where: Prisma.CommentWhereInput = query.where
      ? {
          post: {
            id: query.where.postId,
          },
          userId: query.where.userId,
          content: parseContainsSearcher({ keyword: query.keyword }),
          pinned: query.where.pinned,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const comments = await this.prismaService.comment.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
      include: {
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

    const commentWithImages = await Promise.all(
      comments.map(async (comment) => ({
        ...comment,
        images: await this.prismaService.userImage.findMany({
          where: {
            type: COMMENT,
            refId: comment.id,
          },
          orderBy: {
            position: 'asc',
          },
        }),
      })),
    );
    return paginate<CommentWithAuthorResponse>(
      commentWithImages.map((comment) => plainToClass(CommentWithAuthorResponse, comment)),
      'id',
      query.take,
    );
  }
}
