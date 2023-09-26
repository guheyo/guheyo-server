import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { CreateRoleCommand } from './create-role.command';
import { RoleSavePort } from '../../ports/out/role.save.port';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(@Inject('RoleSavePort') private savePort: RoleSavePort) {}

  async execute(command: CreateRoleCommand): Promise<void> {
    const role = new RoleEntity(command);
    await this.savePort.create(role);
  }
}
