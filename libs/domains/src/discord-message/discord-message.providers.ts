import { DiscordMessageRepository } from './adapter/out/persistence/discord-message.repository';
import { DISCORD_MESSAGE_COMMAND_PROVIDERS } from './application/commands/discord-message.command.providers';

export const DISCORD_MESSAGE_PROVIDERS = [
  {
    provide: 'DiscordMessageLoadPort',
    useClass: DiscordMessageRepository,
  },
  {
    provide: 'DiscordMessageSavePort',
    useClass: DiscordMessageRepository,
  },
  ...DISCORD_MESSAGE_COMMAND_PROVIDERS,
];
