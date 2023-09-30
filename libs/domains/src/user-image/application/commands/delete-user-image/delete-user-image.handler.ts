import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserImageErrorMessage } from '@lib/domains/user-image/domain/user-image.error.message';
import { DeleteUserImageCommand } from './delete-user-image.command';
import { UserImageLoadPort } from '../../ports/user-image.load.port';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@CommandHandler(DeleteUserImageCommand)
export class DeleteUserImageHandler implements ICommandHandler<DeleteUserImageCommand> {
  constructor(
    @Inject('UserImageLoadPort') private readonly userImageLoadPort: UserImageLoadPort,
    @Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort,
  ) {}

  async execute(command: DeleteUserImageCommand): Promise<void> {
    const userImage = await this.userImageLoadPort.findById(command.id);
    if (!userImage) throw new NotFoundException(UserImageErrorMessage.USER_IMAGE_NOT_FOUND);

    await this.userImageSavePort.delete(userImage);
  }
}
