import { FindGuildByIdHandler } from './find-guild-by-id/find-guild-by-id.handler';
import { FindGuildHandler } from './find-guild/find-guild.handler';
import { FindGuildsHandler } from './find-guilds/find-guilds.handler';

export const GUILD_QUERY_PROVIDERS = [FindGuildByIdHandler, FindGuildHandler, FindGuildsHandler];
