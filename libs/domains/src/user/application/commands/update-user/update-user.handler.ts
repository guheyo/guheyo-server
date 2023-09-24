import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import _ from 'lodash';
import { UpdateUserCommand } from './update-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('UserLoadPort') private userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private userSavePort: UserSavePort,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userLoadPort.findById(command.id);
    if (!user) return;

    user.update(_.pick(command, ['name', 'avatarURL']));
    await this.userSavePort.save(user);
  }
}
