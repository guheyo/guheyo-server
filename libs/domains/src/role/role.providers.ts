import { ROLE_COMMAND_PROVIDERS } from './application/commands/role.command.providers';
import { ROLE_QUERY_PROVIDERS } from './application/queries/role.query.providers';

export const ROLE_PROVIDERS = [...ROLE_COMMAND_PROVIDERS, ...ROLE_QUERY_PROVIDERS];
