import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { CreateSocialAccountCommand } from './create-social-account.command';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';

@CommandHandler(CreateSocialAccountCommand)
export class CreateSocialAccountHandler implements ICommandHandler<CreateSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountLoadPort') private loadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private savePort: SocialAccountSavePort,
  ) {}

  async execute(command: CreateSocialAccountCommand): Promise<void> {
    const existingSocialAccount = await this.loadPort.findByProvider(
      command.provider,
      command.socialId,
    );
    if (existingSocialAccount)
      throw new ForbiddenException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_ALREADY_EXISTS);

    const socialAccount = new SocialAccountEntity(command);
    await socialAccount.init();
    await this.savePort.create(socialAccount);
  }
}
