import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountCreateCommand } from './social-account.create.command';
import { SocialAccountSavePort } from '../../port/out/social-account.save.port';

@CommandHandler(SocialAccountCreateCommand)
export class SocialAccountCreateHandler implements ICommandHandler<SocialAccountCreateCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: SocialAccountCreateCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.createSocialAccount(socialAccount);
  }
}
