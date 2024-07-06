import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ThreadErrorMessage } from '@lib/domains/thread/domain/thread.error.message';
import { THREAD } from '@lib/domains/thread/domain/thread.constants';
import { FindThreadQuery } from './find-thread.query';
import { ThreadResponse } from '../../dtos/thread.response';

@QueryHandler(FindThreadQuery)
export class FindThreadHandler extends PrismaQueryHandler {
  async execute(query: FindThreadQuery): Promise<ThreadResponse | null> {
    if (!query.id && !query.slug) return null;

    const thread = await this.prismaService.thread.findFirst({
      where: {
        id: query.id,
        post: {
          slug: query.slug,
        },
      },
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
    });

    if (!thread) throw new NotFoundException(ThreadErrorMessage.THREAD_NOT_FOUND);
    if (thread.post.archivedAt && thread.post.userId !== query.userId)
      throw new ForbiddenException(
        ThreadErrorMessage.FIND_THREADS_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: THREAD,
        refId: thread.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return plainToClass(ThreadResponse, {
      ...thread,
      post: {
        ...thread.post,
        images,
        commentCount: thread.post.comments.length,
        reportCount: 0,
      },
    });
  }
}
