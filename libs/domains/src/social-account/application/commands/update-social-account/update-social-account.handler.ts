import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
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
    if (!socialAccount)
      throw new NotFoundException(SocialAccountErrorMessage.SOCIAL_ACCOUNT_IS_NOT_FOUND);

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
