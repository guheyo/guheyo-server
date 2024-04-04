import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DISCORD_WEBHOOK_PROVIDERS } from '@lib/domains/discord-webhook/discord-webhook.providers';

@Module({
  imports: [CqrsModule],
  providers: [...DISCORD_WEBHOOK_PROVIDERS],
})
export class DiscordWebhookModule {}
