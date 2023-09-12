import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: SavePort<UserEntity>) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.update(user);
  }
}
