import { QueryHandler } from '@nestjs/cqrs';
import bcrypt from 'bcrypt';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindSocialAccountQuery } from './find-social-account.query';
import { SocialAccountResponse } from '../../dtos/social-account.response';

@QueryHandler(FindSocialAccountQuery)
export class FindSocialAccountHandler extends PrismaQueryHandler<
  FindSocialAccountQuery,
  SocialAccountResponse
> {
  constructor() {
    super(SocialAccountResponse);
  }

  async execute(query: FindSocialAccountQuery): Promise<SocialAccountResponse | null> {
    const socialAccount = await this.prismaService.socialAccount.findFirst({
      where: {
        provider: query.provider,
        socialId: query.socialId,
      },
    });
    if (!socialAccount?.refreshToken) return null;
    if (!bcrypt.compareSync(query.refreshToken, socialAccount.refreshToken)) return null;
    return this.parseResponse(socialAccount);
  }
}
