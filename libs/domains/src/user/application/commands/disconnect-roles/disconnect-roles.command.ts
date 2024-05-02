import { ICommand } from '@nestjs/cqrs/dist';
import { DisconnectRolesInput } from './disconnect-roles.input';

export class DisconnectRolesCommand implements ICommand {
  userId: string;

  roleIds: string[];

  roleNames: string[];

  constructor(input: DisconnectRolesInput) {
    this.userId = input.userId;
    this.roleIds = input.roleIds;
    this.roleNames = input.roleNames;
  }
}
