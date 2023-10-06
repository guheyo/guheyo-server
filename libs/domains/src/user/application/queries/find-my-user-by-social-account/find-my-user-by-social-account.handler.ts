import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMyUserBySocialAccountQuery } from './find-my-user-by-social-account.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserBySocialAccountQuery)
export class FindMyUserBySocialAccountHandler extends PrismaQueryHandler<
  FindMyUserBySocialAccountQuery,
  MyUserResponse
> {
  constructor() {
    super(MyUserResponse);
  }

  async execute(query: FindMyUserBySocialAccountQuery): Promise<MyUserResponse | null> {
    const users = await this.prismaService.user.findMany({
      where: {
        socialAccounts: {
          some: {
            provider: query.provider,
            socialId: query.socialId,
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
