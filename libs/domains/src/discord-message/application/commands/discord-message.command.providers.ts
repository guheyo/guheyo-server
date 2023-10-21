import { CreateDiscordMessageHandler } from './create-discord-message/create-discord-message.handler';
import { SendEmbedHandler } from './send-embed/send-embed.handler';

export const DISCORD_MESSAGE_COMMAND_PROVIDERS = [CreateDiscordMessageHandler, SendEmbedHandler];
