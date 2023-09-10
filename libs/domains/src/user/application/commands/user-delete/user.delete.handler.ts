import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserDeleteCommand } from './user.delete.command';

@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: SavePort<UserEntity>) {}

  async execute(command: UserDeleteCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.delete(user);
  }
}
