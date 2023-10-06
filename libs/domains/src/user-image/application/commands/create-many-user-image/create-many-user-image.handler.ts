import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserImageEntity } from '@lib/domains/user-image/domain/user-image.entity';
import { CreateManyUserImageCommand } from './create-many-user-image.command';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@CommandHandler(CreateManyUserImageCommand)
export class CreateManyUserImageHandler implements ICommandHandler<CreateManyUserImageCommand> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async execute(command: CreateManyUserImageCommand): Promise<any> {
    const userImages = command.data.map((createUserInput) => new UserImageEntity(createUserInput));
    await this.userImageSavePort.createMany(userImages);
  }
}
