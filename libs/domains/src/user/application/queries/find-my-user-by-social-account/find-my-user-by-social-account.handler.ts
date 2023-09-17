import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { FindMyUserBySocialAccountQuery } from './find-my-user-by-social-account.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserBySocialAccountQuery)
export class FindMyUserBySocialAccountHandler
  implements IQueryHandler<FindMyUserBySocialAccountQuery>
{
  constructor(private prismaService: PrismaService) {}

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
    return users.length ? new MyUserResponse(users[0]) : null;
  }
}
