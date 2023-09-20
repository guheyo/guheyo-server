import { MEMBER_COMMAND_PROVIDERS } from './application/commands/member.command.providers';
import { MEMBER_EVENT_PROVIDERS } from './application/events/member.event.providers';
import { MEMBER_QUERY_PROVIDERS } from './application/queries/member.query.providers';
import { MEMBER_SAGA_PROVIDERS } from './application/sagas/member.saga.providers';

export const MEMBER_PROVIDERS = [
  ...MEMBER_COMMAND_PROVIDERS,
  ...MEMBER_QUERY_PROVIDERS,
  ...MEMBER_EVENT_PROVIDERS,
  ...MEMBER_SAGA_PROVIDERS,
];
