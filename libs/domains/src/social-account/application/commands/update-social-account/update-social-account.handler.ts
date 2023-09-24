import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import _ from 'lodash';
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
    const socialAccount = await this.socialAccountLoadPort.findById(command.id);
    if (!socialAccount) return;

    socialAccount.update(
      _.pick(command, [
        'refreshToken',
        'accessToken',
        'expiresAt',
        'tokenType',
        'scope',
        'idToken',
        'sessionState',
      ]),
    );
    await this.socialAccountSavePort.save(socialAccount);
  }
}
