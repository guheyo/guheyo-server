import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { plainToInstance } from 'class-transformer';
import { FindPostPreviewQuery } from './find-post-preview.query';
import { PostPreviewWithUserResponse } from '../../dtos/post-preview-with-user.response';

@QueryHandler(FindPostPreviewQuery)
export class FindPostPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindPostPreviewQuery): Promise<PostPreviewWithUserResponse | null> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: query.id,
      },
      include: {
        group: true,
        category: true,
        user: true,
        tags: true,
        brands: true,
      },
    });
    if (post?.archivedAt && post.userId !== query.userId)
      throw new ForbiddenException(PostErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    return plainToInstance(PostPreviewWithUserResponse, post);
  }
}
