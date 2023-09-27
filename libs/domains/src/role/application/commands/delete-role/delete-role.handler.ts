import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { RoleErrorMessage } from '@lib/domains/role/domain/role.error.message';
import { DeleteRoleCommand } from './delete-role.command';
import { RoleLoadPort } from '../../ports/out/role.load.port';
import { RoleSavePort } from '../../ports/out/role.save.port';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    @Inject('RoleLoadPort') private roleLoadPort: RoleLoadPort,
    @Inject('RoleSavePort') private roleSavePort: RoleSavePort,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    const role = await this.roleLoadPort.findById(command.id);
    if (!role) throw new NotFoundException(RoleErrorMessage.ROLE_IS_NOT_FOUND);

    await this.roleSavePort.delete(role);
  }
}
