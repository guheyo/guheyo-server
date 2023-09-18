import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DisconnectRolesCommand } from './disconnect-roles.command';
import { MemberRolesSavePort } from '../../port/out/member-roles.save';

@CommandHandler(DisconnectRolesCommand)
export class DisconnectRolesHandler implements ICommandHandler<DisconnectRolesCommand> {
  constructor(
    @Inject('MemberRolesSavePort')
    private savePort: MemberRolesSavePort,
  ) {}

  async execute(command: DisconnectRolesCommand): Promise<void> {
    await this.savePort.disconnectRoles(command.id, command.roleIds);
  }
}
