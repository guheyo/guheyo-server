import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserDeleteCommand } from './user.delete.command';
import { UserSavePort } from '../../port/out/user.save.port';

@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: UserSavePort) {}

  async execute(command: UserDeleteCommand): Promise<void> {
    await this.userSavePort.delete(command.id);
  }
}
