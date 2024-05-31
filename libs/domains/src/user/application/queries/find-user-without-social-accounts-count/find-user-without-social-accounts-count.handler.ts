import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindUserWithoutSocialAccountsCountQuery } from './find-user-without-social-accounts-count.query';

@QueryHandler(FindUserWithoutSocialAccountsCountQuery)
export class FindUserWithoutSocialAccountsCountHandler extends PrismaQueryHandler {
  async execute(query: FindUserWithoutSocialAccountsCountQuery): Promise<Number> {
    const count = await this.prismaService.user.count({
      where: {
        socialAccounts: {
          none: {
            provider: {
              in: query.providers,
            },
          },
        },
      },
    });
    return count;
  }
}
