import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: SavePort<UserEntity>) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.delete(user);
  }
}
