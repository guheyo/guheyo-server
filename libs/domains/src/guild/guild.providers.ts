import { GUILD_COMMAND_PROVIDERS } from './application/commands/guild.command.providers';
import { GUILD_QUERY_PROVIDERS } from './application/queries/guild.query.providers';

export const GUILD_PROVIDERS = [...GUILD_COMMAND_PROVIDERS, ...GUILD_QUERY_PROVIDERS];
