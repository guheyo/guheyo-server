import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SocialAccountDeleteCommand } from './social-account.delete.command';
import { SocialAccountSavePort } from '../../port/out/social-account.save.port';

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
