import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { MyUserResponse } from '../../dtos/my-user.response';
import { FindMyUserBySessionQuery } from './find-my-user-by-session.query';

@QueryHandler(FindMyUserBySessionQuery)
export class FindMyUserBySessionHandler extends PrismaQueryHandler<
  FindMyUserBySessionQuery,
  MyUserResponse
> {
  constructor() {
    super(MyUserResponse);
  }

  async execute(query: FindMyUserBySessionQuery): Promise<MyUserResponse | null> {
    const users = await this.prismaService.user.findMany({
      where: {
        sessions: {
          some: {
            sessionToken: query.sessionToken,
          },
        },
      },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
    return this.parseResponse(users[0]);
  }
}
