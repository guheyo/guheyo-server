import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { ConnectRolesCommand } from './connect-roles.command';
import { MemberRolesSavePort } from '../../ports/out/member-roles.save.port';
import { MemberLoadPort } from '../../ports/out/member.load.port';
import { MemberSavePort } from '../../ports/out/member.save.port';

@CommandHandler(ConnectRolesCommand)
export class ConnectRolesHandler implements ICommandHandler<ConnectRolesCommand> {
  constructor(
    @Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort,
    @Inject('MemberSavePort') private memberSavePort: MemberSavePort,
    @Inject('MemberRolesSavePort') private memberRolesSavePort: MemberRolesSavePort,
  ) {}

  async execute(command: ConnectRolesCommand): Promise<void> {
    let member = await this.memberLoadPort.find(command.groupId, command.userId);
    if (!member) {
      member = new MemberEntity({
        id: uuid4(),
        groupId: command.groupId,
        userId: command.userId,
      });
      await this.memberSavePort.create(member);
    }
    await this.memberRolesSavePort.connectRoles(member.id, command.roleIds, command.roleNames);
  }
}
