import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { UpdateSocialAccountCommand } from './update-social-account.command';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';

@CommandHandler(UpdateSocialAccountCommand)
export class UpdateSocialAccountHandler implements ICommandHandler<UpdateSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountLoadPort') private socialAccountLoadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: UpdateSocialAccountCommand): Promise<void> {
    let socialAccount: SocialAccountEntity | null = null;
    if (command.id) {
      socialAccount = await this.socialAccountLoadPort.findById(command.id);
    }
    if (command.provider && command.socialId) {
      socialAccount = await this.socialAccountLoadPort.findByProvider(
        command.provider,
        command.socialId,
      );
    }
    if (!socialAccount)
      throw new NotFoundException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_IS_NOT_FOUND);

    await socialAccount.update(command);
    await this.socialAccountSavePort.save(socialAccount);
  }
}
