import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserImageEntity } from '@lib/domains/user-image/domain/user-image.entity';
import { UserImageSavePort } from '../../ports/user-image.save.port';
import { CreateUserImageCommand } from './create-user-image.command';

@CommandHandler(CreateUserImageCommand)
export class CreateUserImageHandler implements ICommandHandler<CreateUserImageCommand> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async execute(command: CreateUserImageCommand): Promise<any> {
    const userImage = new UserImageEntity(command);
    await this.userImageSavePort.create(userImage);
  }
}
