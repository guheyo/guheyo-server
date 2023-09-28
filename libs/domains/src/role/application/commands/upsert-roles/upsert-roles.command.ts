import { ICommand } from '@nestjs/cqrs/dist';
import { UpsertRolesInput } from './upsert-roles.input';
import { CreateRoleInput } from '../create-role/create-role.input';

export class UpsertRolesCommand implements ICommand {
  upsertRoleInputs: CreateRoleInput[];

  constructor(input: UpsertRolesInput) {
    this.upsertRoleInputs = input.upsertRoleInputs;
  }
}
