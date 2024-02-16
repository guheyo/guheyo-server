import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { ChannelType, TextBasedChannel } from 'discord.js';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { SendMessageRequest } from './send-message.request';

@UseGuards(OwnerGuard)
@Injectable()
export class SendMessageSlashCommandHandler {
  @SlashCommand({ name: 'send-message', description: 'Send a message to the channel' })
  public async onSendMessage(
    @Context() [interaction]: SlashCommandContext,
    @Options() { message, channel }: SendMessageRequest,
  ) {
    if (channel.type !== ChannelType.GuildText)
      return interaction.reply({ content: `Invalid Channel Type: Text channel is required` });

    const textChannel = channel as TextBasedChannel;
    textChannel.send(message);
    return interaction.reply({ content: `Sent a message: ${message} to ${channel.name}` });
  }
}
