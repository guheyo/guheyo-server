import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { DiscordMessageErrorMessage } from '@lib/domains/discord-message/domain/discord-message.error.message';
import { DiscordMessageEntity } from '@lib/domains/discord-message/domain/discord-message.entity';
import { SendEmbedCommand } from './send-embed.command';
import { DiscordMessageSavePort } from '../../ports/discord-message.save.port';

@CommandHandler(SendEmbedCommand)
export class SendEmbedHandler implements ICommandHandler<SendEmbedCommand> {
  constructor(
    @Inject('DiscordMessageSavePort')
    private readonly discordMessageSavePort: DiscordMessageSavePort,
    private readonly client: Client,
  ) {}

  async execute(command: SendEmbedCommand): Promise<void> {
    const channel = (await this.client.channels.fetch(command.discordChannelId)) as TextChannel;
    if (!channel) throw new Error(DiscordMessageErrorMessage.NOT_FOUND_CHANNEL);

    const embed = new EmbedBuilder()
      .setColor(command.color)
      .setTitle(command.title)
      .setAuthor({
        name: command.authorInput.name,
        iconURL: command.authorInput.iconURL,
      })
      .setDescription(command.description);
    const message = await channel.send({ embeds: [embed] });
    const discordMessage = new DiscordMessageEntity({
      discordMessageId: message.id,
      discordChannelId: message.channelId,
      discordGuildId: message.guildId,
      modelName: command.modelName,
      modelId: command.discordGuildId,
      guildId: command.guildId,
    });
    await this.discordMessageSavePort.create(discordMessage);
  }
}
