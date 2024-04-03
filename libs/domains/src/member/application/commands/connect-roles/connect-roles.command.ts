import { ICommand } from '@nestjs/cqrs/dist';
import { ConnectRolesInput } from './connect-roles.input';

export class ConnectRolesCommand implements ICommand {
  groupId?: string;

  groupSlug?: string;

  userId: string;

  roleIds: string[];

  roleNames: string[];

  constructor(input: ConnectRolesInput) {
    this.groupId = input.groupId;
    this.groupSlug = input.groupSlug;
    this.userId = input.userId;
    this.roleIds = input.roleIds;
    this.roleNames = input.roleNames;
  }
}
