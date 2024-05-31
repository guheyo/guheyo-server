import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
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
          content: parseFollowedBySearcher(query.keyword),
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

    return paginate<CommentWithAuthorResponse>(
      comments.map((comment) => plainToClass(CommentWithAuthorResponse, comment)),
      'id',
      query.take,
    );
  }
}
