import { FindGuildByIdHandler } from './find-guild-by-id/find-guild-by-id.handler';
import { FindGuildsHandler } from './find-guilds/find-guilds.handler';

export const GUILD_QUERY_PROVIDERS = [FindGuildByIdHandler, FindGuildsHandler];
