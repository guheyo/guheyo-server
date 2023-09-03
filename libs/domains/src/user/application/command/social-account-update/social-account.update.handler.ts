import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountUpdateCommand } from './social-account.update.command';
import { SocialAccountSavePort } from '../../port/out/social-account.save.port';

@CommandHandler(SocialAccountUpdateCommand)
export class SocialAccountUpdateHandler implements ICommandHandler<SocialAccountUpdateCommand> {
  constructor(@Inject('SocialAccountSavePort')
    private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: SocialAccountUpdateCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.update(socialAccount);
  }
}
