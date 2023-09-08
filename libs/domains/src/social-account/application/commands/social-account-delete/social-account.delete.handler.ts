import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountSavePort } from '@lib/domains/social-account/application/port/out/social-account.save.port';
import { SocialAccountDeleteCommand } from './social-account.delete.command';

@CommandHandler(SocialAccountDeleteCommand)
export class SocialAccountDeleteHandler implements ICommandHandler<SocialAccountDeleteCommand> {
  constructor(
    @Inject('SocialAccountSavePort')
    private socialAccountSavePort: SocialAccountSavePort,
  ) {}

  async execute(command: SocialAccountDeleteCommand): Promise<void> {
    await this.socialAccountSavePort.delete(command);
  }
}
