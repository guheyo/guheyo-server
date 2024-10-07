import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { ThreadPreviewResponse } from '../../dtos/thread-preview.response';
import { FindThreadPreviewQuery } from './find-thread-preview.query';

@QueryHandler(FindThreadPreviewQuery)
export class FindThreadPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindThreadPreviewQuery): Promise<ThreadPreviewResponse> {
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
            brands: true,
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

    return plainToInstance(ThreadPreviewResponse, thread);
  }
}
