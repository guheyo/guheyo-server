import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { DeleteUserCommand } from './delete-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject('UserLoadPort') private userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private userSavePort: UserSavePort,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = await this.userLoadPort.findById(command.id);
    if (!user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    await this.userSavePort.delete(user);
  }
}
