import { MEMBER_COMMAND_PROVIDERS } from './application/commands/member.command.providers';
import { MEMBER_QUERY_PROVIDERS } from './application/queries/member.query.providers';

export const MEMBER_PROVIDERS = [...MEMBER_COMMAND_PROVIDERS, ...MEMBER_QUERY_PROVIDERS];
