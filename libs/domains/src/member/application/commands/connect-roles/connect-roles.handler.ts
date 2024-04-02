import { CommandHandler } from '@nestjs/cqrs/dist';
import { ForbiddenException, Inject } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { MemberErrorMessage } from '@lib/domains/member/domain/member.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ConnectRolesCommand } from './connect-roles.command';
import { MemberRolesSavePort } from '../../ports/out/member-roles.save.port';
import { MemberLoadPort } from '../../ports/out/member.load.port';
import { MemberSavePort } from '../../ports/out/member.save.port';
import { MemberResponse } from '../../dtos/member.response';

@CommandHandler(ConnectRolesCommand)
export class ConnectRolesHandler extends PrismaCommandHandler<ConnectRolesCommand, MemberResponse> {
  constructor(
    @Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort,
    @Inject('MemberSavePort') private memberSavePort: MemberSavePort,
    @Inject('MemberRolesSavePort') private memberRolesSavePort: MemberRolesSavePort,
  ) {
    super(MemberResponse);
  }

  async execute(command: ConnectRolesCommand): Promise<void> {
    let member;
    let groupId;
    if (command.groupId) {
      groupId = command.groupId;
    } else if (command.groupSlug) {
      const group = await this.prismaService.group.findFirst({
        where: {
          slug: command.groupSlug,
        },
      });
      if (!group) throw new ForbiddenException(MemberErrorMessage.GROUP_NOT_FOUND);
      groupId = group.id;
    } else {
      throw new ForbiddenException(MemberErrorMessage.INVALID_GROUP_PARAMETERS);
    }

    member = await this.memberLoadPort.find(groupId, command.userId);
    if (!member) {
      member = new MemberEntity({
        id: uuid4(),
        groupId,
        userId: command.userId,
      });
      await this.memberSavePort.create(member);
    }
    await this.memberRolesSavePort.connectRoles(member.id, command.roleIds, command.roleNames);
  }
}
