import { JoinedMemberHandler } from './member/joined-member.handler';
import { UpdatedMemberHandler } from './member/updated-member.handler';
import { ReadyHandler } from './system/ready.handler';
import { WarnHandler } from './system/warn.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  JoinedMemberHandler,
  UpdatedMemberHandler,
];
