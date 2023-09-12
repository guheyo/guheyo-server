import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateSocialAccountCommand } from './create-social-account.command';

@CommandHandler(CreateSocialAccountCommand)
export class CreateSocialAccountHandler implements ICommandHandler<CreateSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SavePort<SocialAccountEntity>,
  ) {}

  async execute(command: CreateSocialAccountCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.create(socialAccount);
  }
}
