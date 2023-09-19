import { Module } from '@nestjs/common';
import { MemberRepository } from '../../adapter/out/persistence/member.repository';
import { CreateMemberHandler } from './create-member/create-member.handler';
import { UpdateMemberHandler } from './update-member/update-member.handler';
import { DeleteMemberHandler } from './delete-member/delete-member.handler';
import { ConnectRolesHandler } from './connect-roles/connect-roles.handler';
import { DisconnectRolesHandler } from './disconnect-roles/disconnect-roles.handler';

const commandHandlers = [
  CreateMemberHandler,
  UpdateMemberHandler,
  DeleteMemberHandler,
  ConnectRolesHandler,
  DisconnectRolesHandler,
];

@Module({
  providers: [
    ...commandHandlers,
    {
      provide: 'MemberSavePort',
      useClass: MemberRepository,
    },
    {
      provide: 'MemberRolesSavePort',
      useClass: MemberRepository,
    },
  ],
})
export class MemberCommandModule {}
