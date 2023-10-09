import { CreateMemberHandler } from './create-member/create-member.handler';
import { UpdateMemberHandler } from './update-member/update-member.handler';
import { DeleteMemberHandler } from './delete-member/delete-member.handler';
import { ConnectRolesHandler } from './connect-roles/connect-roles.handler';
import { DisconnectRolesHandler } from './disconnect-roles/disconnect-roles.handler';
import { CreateMembersOfUserHandler } from './create-members-of-user/create-members-of-user.handler';

export const MEMBER_COMMAND_PROVIDERS = [
  CreateMemberHandler,
  UpdateMemberHandler,
  DeleteMemberHandler,
  ConnectRolesHandler,
  DisconnectRolesHandler,
  CreateMembersOfUserHandler,
];
