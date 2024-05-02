import { ICommand } from '@nestjs/cqrs/dist';
import { ConnectRolesInput } from './connect-roles.input';

export class ConnectRolesCommand implements ICommand {
  userId: string;

  roleIds: string[];

  roleNames: string[];

  constructor({ input, userId }: { input: ConnectRolesInput; userId: string }) {
    this.userId = userId;
    this.roleIds = input.roleIds;
    this.roleNames = input.roleNames;
  }
}
