import { ChannelType, Guild, Message, User } from 'discord.js';

export class DiscordManager {
  constructor(private readonly guild: Guild) {}

  async fetchMessagesFromChannels(channelIds: string[], limit: number) {
    return channelIds.reduce(
      async (messagesPromise: Promise<Message[]>, channelId): Promise<Message[]> => {
        const fetchedMessages = await this.fetchMessagesFromChannel(channelId, limit);
        return [...(await messagesPromise), ...fetchedMessages];
      },
      Promise.resolve([]),
    );
  }

  async fetchMessagesFromChannel(channelId: string, limit: number): Promise<Message[]> {
    const channel = await this.guild.channels.fetch(channelId);
    if (channel?.type !== ChannelType.GuildText) return [];
    const messages = await channel.messages.fetch({ limit });
    const fetchedMessages = await Promise.all(messages.map((message) => message.fetch()));
    return fetchedMessages;
  }

  async fetchMember(guild: Guild, author: User) {
    return guild.members.fetch(author.id);
  }
}
