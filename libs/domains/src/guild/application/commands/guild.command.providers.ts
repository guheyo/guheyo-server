import { CreateGuildHandler } from './create-guild/create-guild.handler';
import { UpdateGuildHandler } from './update-guild/update-guild.handler';
import { DeleteGuildHandler } from './delete-guild/delete-guild.handler';

export const GUILD_COMMAND_PROVIDERS = [CreateGuildHandler, UpdateGuildHandler, DeleteGuildHandler];
