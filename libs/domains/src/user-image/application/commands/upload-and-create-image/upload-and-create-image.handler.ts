import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserImageEntity } from '@lib/domains/user-image/domain/user-image.entity';
import { ImageService } from '@lib/shared';
import { UserImageSavePort } from '../../ports/user-image.save.port';
import { UploadAndCreateImageCommand } from './upload-and-create-image.command';

@CommandHandler(UploadAndCreateImageCommand)
export class UploadAndCreateImageHandler implements ICommandHandler<UploadAndCreateImageCommand> {
  constructor(
    private readonly imageService: ImageService,
    @Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort,
  ) {}

  async execute(command: UploadAndCreateImageCommand): Promise<void> {
    const { url, contentType, name } = await this.imageService.uploadFileFromURL(
      command.url,
      command.type,
      command.userId,
    );
    const userImage = new UserImageEntity({
      id: 'new id',
      name,
      url,
      contentType,
      type: command.type,
      refId: command.refId,
      userId: command.userId,
      source: command.source,
    });
    await this.userImageSavePort.create(userImage);
  }
}