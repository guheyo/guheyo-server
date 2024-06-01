import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateNonExistingSocialAccountCommand } from './create-non-existing-social-account.command';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';
import { SocialAccountWithoutAuthResponse } from '../../dtos/social-account.without-auth.response';

@CommandHandler(CreateNonExistingSocialAccountCommand)
export class CreateNonExistingSocialAccountHandler extends PrismaCommandHandler<
  CreateNonExistingSocialAccountCommand,
  SocialAccountWithoutAuthResponse
> {
  constructor(
    @Inject('SocialAccountLoadPort') private loadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private savePort: SocialAccountSavePort,
  ) {
    super(SocialAccountWithoutAuthResponse);
  }

  async execute(
    command: CreateNonExistingSocialAccountCommand,
  ): Promise<SocialAccountWithoutAuthResponse | null> {
    const existingSocialAccount = await this.prismaService.socialAccount.findFirst({
      where: {
        provider: command.provider,
        socialId: command.socialId,
      },
    });
    if (existingSocialAccount) return null;

    const user = await this.prismaService.user.findFirst({
      where: {
        username: command.username,
      },
    });
    if (!user) return null;

    const socialAccount = await this.prismaService.socialAccount.create({
      data: {
        userId: user.id,
        provider: command.provider,
        socialId: command.socialId,
      },
    });
    return this.parseResponse(socialAccount);
  }
}
