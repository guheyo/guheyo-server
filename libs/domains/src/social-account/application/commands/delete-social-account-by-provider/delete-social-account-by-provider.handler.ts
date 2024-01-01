import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { DeleteSocialAccountByProviderCommand } from './delete-social-account-by-provider.command';
import { SocialAccountLoadPort } from '../../ports/out/social-account.load.port';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';

@CommandHandler(DeleteSocialAccountByProviderCommand)
export class DeleteSocialAccountHandler
  implements ICommandHandler<DeleteSocialAccountByProviderCommand>
{
  constructor(
    @Inject('SocialAccountLoadPort') private socialAccountLoadPort: SocialAccountLoadPort,
    @Inject('SocialAccountSavePort') private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: DeleteSocialAccountByProviderCommand): Promise<void> {
    const socialAccount = await this.socialAccountLoadPort.findByProvider(
      command.provider,
      command.socialId,
    );
    if (!socialAccount)
      throw new NotFoundException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_IS_NOT_FOUND);

    await this.socialAccountSavePort.delete(socialAccount);
  }
}
