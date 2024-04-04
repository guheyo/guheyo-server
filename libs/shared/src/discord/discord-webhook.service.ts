import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbedBuilder, WebhookClient } from 'discord.js';

@Injectable()
export class DiscordWebhookService {
  private readonly webhook: WebhookClient;

  constructor(private readonly configService: ConfigService) {
    this.webhook = new WebhookClient({
      url: this.configService.get('discord.webhook.url')!,
    });
  }

  async sendWebhook({ embeds }: { embeds: EmbedBuilder[] }) {
    return this.webhook.send({
      embeds,
    });
  }
}
