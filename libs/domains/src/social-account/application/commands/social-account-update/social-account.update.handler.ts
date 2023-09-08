import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountSavePort } from '@lib/domains/social-account/port/out/social-account.save.port';
import { SocialAccountUpdateCommand } from './social-account.update.command';

@CommandHandler(SocialAccountUpdateCommand)
export class SocialAccountUpdateHandler implements ICommandHandler<SocialAccountUpdateCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: SocialAccountUpdateCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.update(socialAccount);
  }
}
