import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
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
    if (!socialAccount) return;

    await this.socialAccountSavePort.delete(socialAccount);
  }
}
