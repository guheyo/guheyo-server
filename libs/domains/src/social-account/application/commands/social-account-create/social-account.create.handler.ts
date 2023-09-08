import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountSavePort } from '@lib/domains/social-account/port/out/social-account.save.port';
import { SocialAccountCreateCommand } from './social-account.create.command';

@CommandHandler(SocialAccountCreateCommand)
export class SocialAccountCreateHandler implements ICommandHandler<SocialAccountCreateCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: SocialAccountCreateCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.create(socialAccount);
  }
}
