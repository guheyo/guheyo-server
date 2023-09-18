import { ICommand } from '@nestjs/cqrs/dist';
import { ConnectRolesInput } from './connect-roles.input';

export class ConnectRolesCommand implements ICommand {
  id: string;

  roleIds: string[];

  constructor(input: ConnectRolesInput) {
    this.id = input.id;
    this.roleIds = input.roleIds;
  }
}
