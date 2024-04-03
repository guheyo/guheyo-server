import { ICommand } from '@nestjs/cqrs/dist';
import { DisconnectRolesInput } from './disconnect-roles.input';

export class DisconnectRolesCommand implements ICommand {
  id: string;

  roleIds: string[];

  roleNames: string[];

  constructor(input: DisconnectRolesInput) {
    this.id = input.id;
    this.roleIds = input.roleIds;
    this.roleNames = input.roleNames;
  }
}
