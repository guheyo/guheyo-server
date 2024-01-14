import { MemberRepository } from './adapter/out/persistence/member.repository';
import { MEMBER_COMMAND_PROVIDERS } from './application/commands/member.command.providers';
import { MEMBER_EVENT_PROVIDERS } from './application/events/member.event.providers';
import { MEMBER_QUERY_PROVIDERS } from './application/queries/member.query.providers';
import { MEMBER_SAGA_PROVIDERS } from './application/sagas/member.saga.providers';

export const MEMBER_PROVIDERS = [
  {
    provide: 'MemberLoadPort',
    useClass: MemberRepository,
  },
  {
    provide: 'MemberSavePort',
    useClass: MemberRepository,
  },
  {
    provide: 'MemberRolesSavePort',
    useClass: MemberRepository,
  },
  ...MEMBER_COMMAND_PROVIDERS,
  ...MEMBER_QUERY_PROVIDERS,
  ...MEMBER_EVENT_PROVIDERS,
  ...MEMBER_SAGA_PROVIDERS,
];
