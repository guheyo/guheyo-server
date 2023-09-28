import { GuildChannel } from 'discord.js';
import { ChannelOption, StringOption } from 'necord';

export class SendMessageRequest {
  @StringOption({
    name: 'message',
    description: 'your message',
    required: true,
  })
  message: string;

  @ChannelOption({
    name: 'channel-id',
    description: 'channel id',
    required: true,
  })
  channel: GuildChannel;
}
