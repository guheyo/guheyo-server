import { CreateMemberHandler } from './create-member/create-member.handler';
import { UpdateMemberHandler } from './update-member/update-member.handler';
import { DeleteMemberHandler } from './delete-member/delete-member.handler';
import { ConnectRolesHandler } from './connect-roles/connect-roles.handler';
import { DisconnectRolesHandler } from './disconnect-roles/disconnect-roles.handler';

export const MEMBER_COMMAND_PROVIDERS = [
  CreateMemberHandler,
  UpdateMemberHandler,
  DeleteMemberHandler,
  ConnectRolesHandler,
  DisconnectRolesHandler,
];
