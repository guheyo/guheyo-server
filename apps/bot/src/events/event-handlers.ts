import { JoinedMemberHandler } from './member/joined-member.handler';
import { UpdatedMemberRolesHandler } from './member/updated-member-roles.handler';
import { ReadyHandler } from './system/ready.handler';
import { WarnHandler } from './system/warn.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  JoinedMemberHandler,
  UpdatedMemberRolesHandler,
];
