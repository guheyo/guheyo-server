import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { ConnectRolesCommand } from './connect-roles.command';
import { MemberRolesSavePort } from '../../port/out/member-roles.save';

@CommandHandler(ConnectRolesCommand)
export class ConnectRolesHandler implements ICommandHandler<ConnectRolesCommand> {
  constructor(
    @Inject('MemberRolesSavePort')
    private savePort: MemberRolesSavePort,
  ) {}

  async execute(command: ConnectRolesCommand): Promise<void> {
    await this.savePort.connectRoles(command.id, command.roleIds);
  }
}
