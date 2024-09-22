import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PaginatedThreadPreviewsResponse } from './paginated-thread-previews.response';
import { ThreadPreviewResponse } from '../../dtos/thread-preview.response';
import { FindThreadPreviewsQuery } from './find-thread-previews.query';

@QueryHandler(FindThreadPreviewsQuery)
export class FindThreadPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindThreadPreviewsQuery): Promise<PaginatedThreadPreviewsResponse> {
    const keywordCondition = query.keyword
      ? {
          OR: [
            ...(['all', 'title', undefined].includes(query.target)
              ? [
                  {
                    post: {
                      title: parseContainsSearcher({
                        keyword: query.keyword,
                      }),
                    },
                  },
                ]
              : []),
            ...(['all', 'content', undefined].includes(query.target)
              ? [
                  {
                    content: parseContainsSearcher({
                      keyword: query.keyword,
                    }),
                  },
                ]
              : []),
          ],
        }
      : {};

    const where: Prisma.ThreadWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            category: {
              type: query.where.categoryType,
            },
            userId: query.where.userId,
            pending: query.where.pending,
            ...(query.where.tagNames
              ? {
                  tags: {
                    some: {
                      name: {
                        in: query.where.tagNames,
                      },
                    },
                  },
                }
              : {}),
            ...(query.where.brandIds
              ? {
                  brands: {
                    some: {
                      id: {
                        in: query.where.brandIds,
                      },
                    },
                  },
                }
              : {}),
            createdAt: query.where.createdAt
              ? {
                  gt: new Date(query.where.createdAt.gt),
                }
              : undefined,
            ...(query.where?.followed && {
              user: {
                followers: {
                  some: {
                    followerId: query.userId || '-1',
                  },
                },
              },
            }),
          },
          ...keywordCondition,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const threads = await this.prismaService.thread.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            group: true,
            category: true,
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
            tags: true,
            comments: {
              where: {
                deletedAt: null,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<ThreadPreviewResponse>(
      threads.map((thread) =>
        plainToInstance(ThreadPreviewResponse, {
          ...thread,
          post: {
            ...thread.post,
            commentCount: thread.post.comments.length,
          },
        }),
      ),
      'id',
      query.take,
    );
  }
}
