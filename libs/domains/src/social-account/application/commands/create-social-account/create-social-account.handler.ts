import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { CreateSocialAccountCommand } from './create-social-account.command';
import { SocialAccountSavePort } from '../../ports/out/social-account.save.port';

@CommandHandler(CreateSocialAccountCommand)
export class CreateSocialAccountHandler implements ICommandHandler<CreateSocialAccountCommand> {
  constructor(
    @Inject('SocialAccountSavePort') private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: CreateSocialAccountCommand): Promise<void> {
    const socialAccount = new SocialAccountEntity(command);
    await this.socialAccountSavePort.create(socialAccount);
  }
}
