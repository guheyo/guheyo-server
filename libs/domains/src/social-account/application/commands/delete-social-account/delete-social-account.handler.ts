import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { DeleteSocialAccountCommand } from './delete-social-account.command';

@CommandHandler(DeleteSocialAccountCommand)
export class DeleteSocialAccountHandler implements ICommandHandler<DeleteSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SavePort<SocialAccountEntity>,
  ) {}

  async execute(command: DeleteSocialAccountCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.delete(socialAccount);
  }
}
