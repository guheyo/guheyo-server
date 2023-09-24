import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { ConnectRolesCommand } from './connect-roles.command';
import { MemberRolesSavePort } from '../../ports/out/member-roles.save.port';

@CommandHandler(ConnectRolesCommand)
export class ConnectRolesHandler implements ICommandHandler<ConnectRolesCommand> {
  constructor(@Inject('MemberRolesSavePort') private memberSavePort: MemberRolesSavePort) {}

  async execute(command: ConnectRolesCommand): Promise<void> {
    await this.memberSavePort.connectRoles(command.id, command.roleIds);
  }
}
