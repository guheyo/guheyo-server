import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindNonExistingSocialAccountsQuery } from './find-non-existing-social-accounts.query';
import { NonExistingSocialAccountsResponse } from '../../dtos/non-existing-social-accounts.response';

@QueryHandler(FindNonExistingSocialAccountsQuery)
export class FindNonExistingSocialAccountsHandler extends PrismaQueryHandler {
  async execute(
    query: FindNonExistingSocialAccountsQuery,
  ): Promise<NonExistingSocialAccountsResponse> {
    const socialIdPromises = query.socialIds.map(async (socialId) => {
      const existingSocialAccount = await this.prismaService.socialAccount.findFirst({
        where: {
          provider: query.provider,
          socialId,
        },
      });
      if (existingSocialAccount) return null;
      return socialId;
    });

    const socialIds = await Promise.all(socialIdPromises);
    return plainToClass(NonExistingSocialAccountsResponse, {
      provider: query.provider,
      socialIds: socialIds.filter((socialId): socialId is string => !!socialId),
    });
  }
}
