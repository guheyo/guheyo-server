import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserCreateCommand } from './user.create.command';
import { UserSavePort } from '../../port/out/user.save.port';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: UserSavePort) {}

  async execute(command: UserCreateCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.create(user);
  }
}
