import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UntrackUserImagesCommand } from './untrack-user-images.command';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@CommandHandler(UntrackUserImagesCommand)
export class UntrackUserImagesHandler implements ICommandHandler<UntrackUserImagesCommand> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async execute(command: UntrackUserImagesCommand) {
    await this.userImageSavePort.untrackImages(command.type, command.refId);
  }
}
