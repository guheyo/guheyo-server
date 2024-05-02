import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DisconnectRolesCommand } from './disconnect-roles.command';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(DisconnectRolesCommand)
export class DisconnectRolesHandler implements ICommandHandler<DisconnectRolesCommand> {
  constructor(@Inject('UserSavePort') private savePort: UserSavePort) {}

  async execute(command: DisconnectRolesCommand): Promise<void> {
    await this.savePort.disconnectRoles({
      userId: command.userId,
      roleIds: command.roleIds,
      roleNames: command.roleNames,
    });
  }
}
