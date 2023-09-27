import { JoinedMemberHandler } from './added-member/joined-member.handler';
import { UpdatedMemberRolesHandler } from './updated-member/updated-member-roles.handler';
import { ReadyHandler } from './ready/ready.handler';
import { WarnHandler } from './warn/warn.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  JoinedMemberHandler,
  UpdatedMemberRolesHandler,
];
