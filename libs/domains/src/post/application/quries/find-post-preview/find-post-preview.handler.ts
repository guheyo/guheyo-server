import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { FindPostPreviewQuery } from './find-post-preview.query';
import { PostPreviewResponse } from '../../dtos/post-preview.response';

@QueryHandler(FindPostPreviewQuery)
export class FindPostPreviewHandler extends PrismaQueryHandler<
  FindPostPreviewQuery,
  PostPreviewResponse
> {
  constructor() {
    super(PostPreviewResponse);
  }

  async execute(query: FindPostPreviewQuery): Promise<PostPreviewResponse | null> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: query.id,
      },
      include: {
        user: {
          include: {
            members: {
              include: {
                group: true,
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
    if (post?.archivedAt && post.userId !== query.userId)
      throw new ForbiddenException(PostErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    return this.parseResponse(post);
  }
}
