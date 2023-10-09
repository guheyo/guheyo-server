import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackUserImagesCommand } from './track-user-images.command';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@CommandHandler(TrackUserImagesCommand)
export class TrackUserImagesHandler implements ICommandHandler<TrackUserImagesCommand> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async execute(command: TrackUserImagesCommand) {
    await this.userImageSavePort.trackImages(command.type, command.refId);
  }
}
