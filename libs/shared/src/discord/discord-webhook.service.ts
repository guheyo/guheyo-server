import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbedBuilder, WebhookClient } from 'discord.js';

@Injectable()
export class DiscordWebhookService {
  private readonly webhookClients: { [key: string]: WebhookClient } = {};

  constructor(private readonly configService: ConfigService) {}

  private getWebhookClient(target: string): WebhookClient {
    if (!this.webhookClients[target]) {
      const url = this.configService.get(`discord.webhookURL.${target}`);
      this.webhookClients[target] = new WebhookClient({ url });
    }
    return this.webhookClients[target];
  }

  async sendWebhook({ target, embeds }: { target: string; embeds: EmbedBuilder[] }) {
    const webhookClient = this.getWebhookClient(target);
    return webhookClient.send({ embeds });
  }
}
