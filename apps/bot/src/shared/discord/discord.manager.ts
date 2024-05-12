import {
  ChannelType,
  Guild,
  Message,
  TextChannel,
  User,
  FetchMessagesOptions,
  ThreadChannel,
  GuildForumTag,
  ForumChannel,
  GuildForumThreadManager,
  FetchArchivedThreadOptions,
} from 'discord.js';
import { ThreadPost } from '../interfaces/post-message.interfaces';

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

  async fetchThreadPostsFromForum(channelId: string, limit: number): Promise<ThreadPost[]> {
    const channel = await this.guild.channels.fetch(channelId);
    if (channel?.type !== ChannelType.GuildForum) return [];

    const threadChannels = await this.fetchAllThreadChannels(channel, limit);
    return threadChannels.reduce(
      async (threadPostsPromise: Promise<ThreadPost[]>, threadChannel): Promise<ThreadPost[]> => {
        const threadPost = await this.fetchThreadPost(threadChannel, channel.availableTags);
        if (!threadPost) return threadPostsPromise;
        return [...(await threadPostsPromise), threadPost];
      },
      Promise.resolve([]),
    );
  }

  async fetchThreadPost(
    threadChannel: ThreadChannel,
    availableTags: GuildForumTag[],
  ): Promise<ThreadPost | null> {
    let starterMessage: Message | null;
    try {
      starterMessage = await threadChannel.fetchStarterMessage();
      if (!starterMessage) return null;
    } catch (e) {
      return null;
    }

    return {
      threadChannel,
      tagNames: this.getTagNames(threadChannel.appliedTags, availableTags),
      starterMessage,
    };
  }

  async fetchThreadChannelsFromForum(channelId: string, limit: number): Promise<ThreadChannel[]> {
    const channel = await this.guild.channels.fetch(channelId);
    if (channel?.type !== ChannelType.GuildForum) return [];

    return this.fetchAllThreadChannels(channel, limit);
  }

  async fetchAllThreadChannels(channel: ForumChannel, limit: number): Promise<ThreadChannel[]> {
    const { threads } = channel;
    const fetchedThreads = await threads.fetch();
    const threadChannels = fetchedThreads.threads.map((c) => c);
    return this.fetchOldThreadChannels(threadChannels, threads, undefined, limit);
  }

  async fetchOldThreadChannels(
    oldThreadChannels: ThreadChannel[],
    threads: GuildForumThreadManager,
    lastThreadChannelId: string | undefined,
    limit: number,
  ): Promise<ThreadChannel[]> {
    const options: FetchArchivedThreadOptions = {
      limit: 100,
    };
    if (lastThreadChannelId) options.before = lastThreadChannelId;

    const fetchedThreads = await threads.fetchArchived(options);
    const threadChannels = fetchedThreads.threads.map((c) => c);
    oldThreadChannels.push(...threadChannels);
    if (threadChannels.length < 100 || oldThreadChannels.length > limit) {
      return oldThreadChannels.slice(0, limit);
    }
    const lastThreadChannel = fetchedThreads.threads.last();
    return this.fetchOldThreadChannels(oldThreadChannels, threads, lastThreadChannel?.id, limit);
  }

  getTagNames(appliedTagIds: string[], availableTags: GuildForumTag[]): string[] {
    return availableTags.filter((tag) => appliedTagIds.includes(tag.id)).map((tag) => tag.name);
  }
}
