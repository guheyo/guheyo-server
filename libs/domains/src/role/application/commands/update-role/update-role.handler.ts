import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { RoleErrorMessage } from '@lib/domains/role/domain/role.error.message';
import { UpdateRoleCommand } from './update-role.command';
import { RoleLoadPort } from '../../ports/out/role.load.port';
import { RoleSavePort } from '../../ports/out/role.save.port';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @Inject('RoleSavePort') private roleSavePort: RoleSavePort,
    @Inject('RoleLoadPort') private roleLoadPort: RoleLoadPort,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<void> {
    const role = await this.roleLoadPort.findById(command.id);
    if (!role) throw new NotFoundException(RoleErrorMessage.ROLE_IS_NOT_FOUND);

    await this.roleSavePort.save(role);
  }
}
