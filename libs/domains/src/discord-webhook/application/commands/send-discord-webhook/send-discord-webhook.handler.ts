import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DiscordWebhookService } from '@lib/shared/discord/discord-webhook.service';
import { EmbedBuilder } from 'discord.js';
import { SendDiscordWebhookCommand } from './send-discord-webhook.command';

@CommandHandler(SendDiscordWebhookCommand)
export class SendDiscordWebhookHandler implements ICommandHandler<SendDiscordWebhookCommand> {
  constructor(private readonly discordWebhookClient: DiscordWebhookService) {}

  async execute(command: SendDiscordWebhookCommand): Promise<void> {
    const embed = new EmbedBuilder()
      .setTitle(command.title)
      .setColor(command.color)
      .setAuthor({
        name: command.username,
        iconURL: command.avatarURL,
      })
      .setDescription(command.url);
    await this.discordWebhookClient.sendWebhook({ embeds: [embed] });
  }
}
