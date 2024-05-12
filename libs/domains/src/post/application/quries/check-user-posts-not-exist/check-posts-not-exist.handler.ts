import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { CheckPostsNotExistQuery } from './check-posts-not-exist.query';

@QueryHandler(CheckPostsNotExistQuery)
export class CheckPostsNotExistHandler extends PrismaQueryHandler<CheckPostsNotExistQuery, String> {
  constructor() {
    super(String);
  }

  async execute(query: CheckPostsNotExistQuery): Promise<string[]> {
    const existingPosts = await this.prismaService.post.findMany({
      where: {
        id: {
          in: query.postIds,
        },
      },
      select: {
        id: true,
      },
    });

    const existingPostIds = existingPosts.map((post) => post.id);
    const nonExistingPostIds = query.postIds.filter((postId) => !existingPostIds.includes(postId));
    return nonExistingPostIds;
  }
}
