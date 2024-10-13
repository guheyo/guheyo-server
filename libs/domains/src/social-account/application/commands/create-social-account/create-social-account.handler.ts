import { CommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, Inject, Logger } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateSocialAccountCommand } from './create-social-account.command';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';
import { SocialAccountResponse } from '../../dtos/social-account.response';

@CommandHandler(CreateSocialAccountCommand)
export class CreateSocialAccountHandler extends PrismaCommandHandler<
  CreateSocialAccountCommand,
  SocialAccountResponse
> {
  private readonly logger = new Logger(CreateSocialAccountHandler.name);

  constructor(
    @Inject('SocialAccountLoadPort') private loadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private savePort: SocialAccountSavePort,
  ) {
    super(SocialAccountResponse);
  }

  async execute(command: CreateSocialAccountCommand): Promise<void> {
    const existingSocialAccount = await this.loadPort.findByProvider(
      command.provider,
      command.socialId,
    );
    if (existingSocialAccount) {
      this.logger.error(
        `Social account creation failed: account already exists. Requesting User ID: ${command.userId}, Existing User ID: ${existingSocialAccount.userId}, Provider: ${command.provider}, Social ID: ${command.socialId}`,
      );
      await this.prismaService.socialAccountConflict.create({
        data: {
          conflictReason: 'Existing social account detected',
          provider: command.provider,
          socialId: command.socialId,
          newUserId: command.userId,
          existingUserId: existingSocialAccount.userId,
          status: 'pending',
          userAgent: command.userAgent,
          ipAddress: command.ipAddress,
        },
      });
      throw new ForbiddenException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_ALREADY_EXISTS);
    }

    const socialAccount = new SocialAccountEntity(command);
    await socialAccount.init();
    await this.savePort.create(socialAccount);
  }
}
