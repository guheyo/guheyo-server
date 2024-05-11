import {
  ChannelType,
  Guild,
  Message,
  TextChannel,
  User,
  FetchMessagesOptions,
  ThreadChannel,
  GuildForumTag,
} from 'discord.js';
import { PostMessage } from '../interfaces/post-message.interfaces';

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

  async fetchPostMessagesFromForum(channelId: string, limit: number): Promise<PostMessage[]> {
    const channel = await this.guild.channels.fetch(channelId);
    if (channel?.type !== ChannelType.GuildForum) return [];

    const { threads } = channel;
    const fetchedThreads = await threads.fetch();
    const threadChannels = fetchedThreads.threads.map((c) => c);
    return threadChannels.reduce(
      async (
        postMessagesPromise: Promise<PostMessage[]>,
        threadChannel,
      ): Promise<PostMessage[]> => {
        const postMessage = await this.fetchPostMessageFromThreadChannel(
          threadChannel,
          channel.availableTags,
        );
        if (!postMessage) return postMessagesPromise;
        return [...(await postMessagesPromise), postMessage];
      },
      Promise.resolve([]),
    );
  }

  async fetchPostMessageFromThreadChannel(
    threadChannel: ThreadChannel,
    availableTags: GuildForumTag[],
  ): Promise<PostMessage | null> {
    const firstMessage = await threadChannel.fetchStarterMessage();
    if (!firstMessage) return null;

    return {
      title: threadChannel.name,
      tagNames: this.getTagNames(threadChannel.appliedTags, availableTags),
      message: firstMessage,
    };
  }

  getTagNames(appliedTagIds: string[], availableTags: GuildForumTag[]): string[] {
    return availableTags.filter((tag) => appliedTagIds.includes(tag.id)).map((tag) => tag.name);
  }
}
