import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindAuthorQuery } from './find-author.query';
import { AuthorResponse } from '../../dtos/author.response';

@QueryHandler(FindAuthorQuery)
export class FindAuthorHandler extends PrismaQueryHandler {
  async execute(query: FindAuthorQuery): Promise<AuthorResponse | null> {
    if (!query.id && !query.username) return null;

    const user = await this.prismaService.user.findFirst({
      where: {
        id: query.id,
        username: query.username,
      },
      include: {
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
        socialAccounts: true,
        followers: {
          include: {
            follower: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
    });

    return plainToInstance(AuthorResponse, {
      ...user,
      followed: user?.followers.some((follow) => follow.followerId === query.user?.id),
      followers: user?.followers.map((follow) => follow.follower),
      following: user?.following.map((follow) => follow.following),
    });
  }
}
