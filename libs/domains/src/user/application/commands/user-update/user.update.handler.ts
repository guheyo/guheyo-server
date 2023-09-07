import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserUpdateCommand } from './user.update.command';
import { UserSavePort } from '../../port/out/user.save.port';

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: UserSavePort) {}

  async execute(command: UserUpdateCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.update(user);
  }
}
