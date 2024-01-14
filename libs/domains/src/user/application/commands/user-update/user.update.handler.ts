import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserUpdateCommand } from './user.update.command';

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: SavePort<UserEntity>) {}

  async execute(command: UserUpdateCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.update(user);
  }
}
