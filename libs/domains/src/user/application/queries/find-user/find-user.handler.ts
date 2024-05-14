import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindUserQuery } from './find-user.query';
import { UserResponse } from '../../dtos/user.response';

@QueryHandler(FindUserQuery)
export class FindUserHandler extends PrismaQueryHandler<FindUserQuery, UserResponse> {
  constructor() {
    super(UserResponse);
  }

  async execute(query: FindUserQuery): Promise<UserResponse | null> {
    if (query.provider && query.socialId) {
      const user = await this.prismaService.user.findFirst({
        where: {
          socialAccounts: {
            some: {
              provider: query.provider,
              socialId: query.socialId,
            },
          },
        },
      });
      return this.parseResponse(user);
    }
    if (query.username) {
      const user = await this.prismaService.user.findUnique({
        where: {
          username: query.username,
        },
      });
      return this.parseResponse(user);
    }
    return null;
  }
}
