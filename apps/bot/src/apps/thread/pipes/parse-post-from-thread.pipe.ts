import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { Message, ThreadChannel } from 'discord.js';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';

@Injectable()
export class ParsePostFromThreadPipe implements PipeTransform {
  protected discordManager: DiscordManager;

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<ThreadPost> {
    let message: Message;
    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();
    if (!message.guild) {
      throw new RpcException(
        `Guild not found. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
    }

    this.discordManager = new DiscordManager(message.guild);
    const channel = message.channel as ThreadChannel;
    if (!channel.parentId) {
      throw new RpcException(
        `Message parentId. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
    }

    const forumChannel = await this.discordManager.fetchForumChannel(channel.parentId);
    const threadPost = await this.discordManager.fetchThreadPost(
      channel,
      forumChannel.availableTags,
    );

    if (!threadPost)
      throw new RpcException(
        `Thread post not fetched. messageId: ${message.id}, channelId: ${message.channelId}`,
      );

    return threadPost;
  }
}
