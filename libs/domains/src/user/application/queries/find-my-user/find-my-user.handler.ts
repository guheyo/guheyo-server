import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { ForbiddenException } from '@nestjs/common';
import { FindMyUserQuery } from './find-my-user.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserQuery)
export class FindMyUserHandler extends PrismaQueryHandler<FindMyUserQuery, MyUserResponse> {
  constructor() {
    super(MyUserResponse);
  }

  async execute(query: FindMyUserQuery): Promise<MyUserResponse | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: query.userId,
      },
      include: {
        socialAccounts: true,
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
      },
    });
    if (user?.id !== query.userId)
      throw new ForbiddenException(UserErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    return this.parseResponse(user);
  }
}
