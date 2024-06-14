import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DiscordWebhookService } from '@lib/shared/discord/discord-webhook.service';
import { SendDiscordWebhookCommand } from './send-discord-webhook.command';

@CommandHandler(SendDiscordWebhookCommand)
export class SendDiscordWebhookHandler implements ICommandHandler<SendDiscordWebhookCommand> {
  constructor(private readonly discordWebhookClient: DiscordWebhookService) {}

  async execute(command: SendDiscordWebhookCommand): Promise<void> {
    await this.discordWebhookClient.sendWebhook({
      target: command.target,
      embeds: [command.embed],
    });
  }
}
