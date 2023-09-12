import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UpdateSocialAccountCommand } from './update-social-account.command';

@CommandHandler(UpdateSocialAccountCommand)
export class UpdateSocialAccountHandler implements ICommandHandler<UpdateSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SavePort<SocialAccountEntity>,
  ) {}

  async execute(command: UpdateSocialAccountCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.update(socialAccount);
  }
}
