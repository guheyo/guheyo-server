import { ChannelType, Guild, Message, TextChannel, User, FetchMessagesOptions } from 'discord.js';

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
    return this.fetchOldMessages([], channel, undefined, limit);
  }

  async fetchOldMessages(
    oldMessages: Message[],
    channel: TextChannel,
    lastMessageId: string | undefined,
    limit: number,
  ): Promise<Message[]> {
    const options: FetchMessagesOptions = {
      limit: 100,
    };
    if (lastMessageId) options.before = lastMessageId;

    const fetchedMessages = await channel.messages.fetch(options);
    const messages = fetchedMessages.map((message) => message);
    oldMessages.push(...messages);
    if (messages.length < 100 || oldMessages.length > limit) {
      return oldMessages.slice(0, limit);
    }
    const lastMessage = fetchedMessages.last();
    return this.fetchOldMessages(oldMessages, channel, lastMessage?.id, limit);
  }

  async fetchMember(guild: Guild, author: User) {
    return guild.members.fetch(author.id);
  }
}
