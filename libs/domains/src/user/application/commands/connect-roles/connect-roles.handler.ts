import { CommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ConnectRolesCommand } from './connect-roles.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserResponse } from '../../dtos/user.response';

@CommandHandler(ConnectRolesCommand)
export class ConnectRolesHandler extends PrismaCommandHandler<ConnectRolesCommand, UserResponse> {
  constructor(
    @Inject('UserLoadPort') private loadPort: UserLoadPort,
    @Inject('UserSavePort') private savePort: UserSavePort,
  ) {
    super(UserResponse);
  }

  async execute(command: ConnectRolesCommand): Promise<void> {
    await this.savePort.connectRoles({
      userId: command.userId,
      roleIds: command.roleIds,
      roleNames: command.roleNames,
    });
  }
}
