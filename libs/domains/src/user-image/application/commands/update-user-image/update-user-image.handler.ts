import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserImageErrorMessage } from '@lib/domains/user-image/domain/user-image.error.message';
import { UserImageLoadPort } from '../../ports/user-image.load.port';
import { UserImageSavePort } from '../../ports/user-image.save.port';
import { UpdateUserImageCommand } from './update-user-image.command';

@CommandHandler(UpdateUserImageCommand)
export class UpdateUserImageHandler implements ICommandHandler<UpdateUserImageCommand> {
  constructor(
    @Inject('UserImageLoadPort') private readonly userImageLoadPort: UserImageLoadPort,
    @Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort,
  ) {}

  async execute(command: UpdateUserImageCommand): Promise<void> {
    const userImage = await this.userImageLoadPort.findById(command.id);
    if (!userImage) throw new NotFoundException(UserImageErrorMessage.USER_IMAGE_NOT_FOUND);

    userImage.updatePosition(command.position);
    await this.userImageSavePort.save(userImage);
  }
}
