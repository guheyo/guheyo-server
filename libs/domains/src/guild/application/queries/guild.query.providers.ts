import { FindGuildByIdHandler } from './find-guild-by-id/find-guild-by-id.handler';
import { FindGuildByNameHandler } from './find-guild-by-name/find-guild-by-name.handler';
import { FindGuildsHandler } from './find-guilds/find-guilds.handler';

export const GUILD_QUERY_PROVIDERS = [
  FindGuildByIdHandler,
  FindGuildByNameHandler,
  FindGuildsHandler,
];
