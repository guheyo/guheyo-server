import { DiscordWebhookService } from '@lib/shared/discord/discord-webhook.service';
import { DISCORD_WEBHOOK_COMMAND_PROVIDERS } from './application/commands/discord-webhook.command.providers';
import { DiscordWebhookSagas } from './application/sagas/discord-webhook.sagas';

export const DISCORD_WEBHOOK_PROVIDERS = [
  ...DISCORD_WEBHOOK_COMMAND_PROVIDERS,
  DiscordWebhookSagas,
  DiscordWebhookService,
];
