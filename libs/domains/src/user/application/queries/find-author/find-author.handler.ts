import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { Prisma } from '@prisma/client';
import { FindAuthorQuery } from './find-author.query';
import { AuthorResponse } from '../../dtos/author.response';

@QueryHandler(FindAuthorQuery)
export class FindAuthorHandler extends PrismaQueryHandler<FindAuthorQuery, AuthorResponse> {
  constructor() {
    super(AuthorResponse);
  }

  async execute(query: FindAuthorQuery): Promise<AuthorResponse | null> {
    let where: Prisma.UserWhereInput;
    if (query.provider && query.socialId) {
      where = {
        socialAccounts: {
          some: {
            provider: query.provider,
            socialId: query.socialId,
          },
        },
      };
    } else {
      where = {
        id: query.id,
        username: query.username,
      };
    }

    const user = await this.prismaService.user.findFirst({
      where,
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
