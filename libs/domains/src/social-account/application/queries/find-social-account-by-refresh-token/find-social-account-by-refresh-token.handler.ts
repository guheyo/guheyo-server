import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { hashToken } from '@lib/shared/bcrypt/bcypt';
import { FindSocialAccountByRefreshToken } from './find-social-account-by-refresh-token.query';
import { SocialAccountResponse } from '../../dtos/social-account.response';

@QueryHandler(FindSocialAccountByRefreshToken)
export class FindSocialAccountByRefreshTokenHandler extends PrismaQueryHandler<
  FindSocialAccountByRefreshToken,
  SocialAccountResponse
> {
  async execute(query: FindSocialAccountByRefreshToken): Promise<SocialAccountResponse | null> {
    const socialAccount = this.prismaService.socialAccount.findFirst({
      where: {
        refreshToken: await hashToken(query.refreshToken),
      },
    });
    return this.parseResponse(socialAccount);
  }
}
