import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindNonExistingSocialAccountsQuery } from './find-non-existing-social-accounts.query';
import { NonExistingSocialAccountsResponse } from '../../dtos/non-existing-social-accounts.response';
import { SocialUserResponse } from '../../dtos/social-user.response';

@QueryHandler(FindNonExistingSocialAccountsQuery)
export class FindNonExistingSocialAccountsHandler extends PrismaQueryHandler {
  async execute(
    query: FindNonExistingSocialAccountsQuery,
  ): Promise<NonExistingSocialAccountsResponse> {
    const socialUserPromises = query.socialUsers.map(async (socialUser) => {
      const existingSocialAccount = await this.prismaService.socialAccount.findFirst({
        where: {
          provider: socialUser.provider,
          socialId: socialUser.socialId,
        },
      });
      if (existingSocialAccount) return null;
      return socialUser;
    });

    const socialUsers = await Promise.all(socialUserPromises);
    return plainToClass(NonExistingSocialAccountsResponse, {
      socialUsers: socialUsers.filter(
        (socialUser): socialUser is SocialUserResponse => !!socialUser,
      ),
    });
  }
}
