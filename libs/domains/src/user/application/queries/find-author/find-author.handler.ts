import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindAuthorQuery } from './find-author.query';
import { AuthorResponse } from '../../dtos/author.response';

@QueryHandler(FindAuthorQuery)
export class FindAuthorHandler extends PrismaQueryHandler<FindAuthorQuery, AuthorResponse> {
  constructor() {
    super(AuthorResponse);
  }

  async execute(query: FindAuthorQuery): Promise<AuthorResponse | null> {
    if (!query.id && !query.username) return null;

    const user = await this.prismaService.user.findFirst({
      where: {
        id: query.id,
        username: query.username,
      },
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
    });
    return this.parseResponse(user);
  }
}
