import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { SocialAccountCreateCommand } from './social-account.create.command';

@CommandHandler(SocialAccountCreateCommand)
export class SocialAccountCreateHandler implements ICommandHandler<SocialAccountCreateCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SavePort<SocialAccountEntity>,
  ) {}

  async execute(command: SocialAccountCreateCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.create(socialAccount);
  }
}
