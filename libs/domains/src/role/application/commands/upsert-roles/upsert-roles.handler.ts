import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { UpsertRolesCommand } from './upsert-roles.command';
import { RoleSavePort } from '../../ports/out/role.save.port';

@CommandHandler(UpsertRolesCommand)
export class UpsertRolesHandler implements ICommandHandler<UpsertRolesCommand> {
  constructor(@Inject('RoleSavePort') private savePort: RoleSavePort) {}

  async execute(command: UpsertRolesCommand): Promise<void> {
    const roles = command.upsertRoleInputs.map((input) => new RoleEntity(input));
    await this.savePort.upsertRoles(roles);
  }
}
