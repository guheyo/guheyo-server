import { DiscordWebhookService } from '@lib/shared/discord/discord-webhook.service';
import { DISCORD_WEBHOOK_COMMAND_PROVIDERS } from './application/commands/discord-webhook.command.providers';
import { DiscordWebhookSagas } from './application/sagas/discord-webhook.sagas';
import { DiscordWebhookParser } from './application/services/discord-webhook.parser';

export const DISCORD_WEBHOOK_PROVIDERS = [
  ...DISCORD_WEBHOOK_COMMAND_PROVIDERS,
  DiscordWebhookSagas,
  DiscordWebhookService,
  DiscordWebhookParser,
];
