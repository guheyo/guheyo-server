import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { DeleteSocialAccountCommand } from './delete-social-account.command';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';

@CommandHandler(DeleteSocialAccountCommand)
export class DeleteSocialAccountHandler implements ICommandHandler<DeleteSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountLoadPort') private socialAccountLoadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: DeleteSocialAccountCommand): Promise<void> {
    const socialAccount = await this.socialAccountLoadPort.findById(command.id);
    if (!socialAccount)
      throw new NotFoundException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_IS_NOT_FOUND);

    await this.socialAccountSavePort.delete(socialAccount);
  }
}
