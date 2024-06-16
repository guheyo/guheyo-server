import { Inject, Injectable } from '@nestjs/common';
import { Message, ThreadChannel } from 'discord.js';
import { CheckPostsNotExistQuery } from '@lib/domains/post/application/quries/check-user-posts-not-exist/check-posts-not-exist.query';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { PostParser } from '../parsers/post.parser';

@Injectable()
export class PostClient extends UserImageClient {
  @Inject()
  protected readonly postParser: PostParser;

  async checkPostsNotExist(postIds: string[]): Promise<string[]> {
    return this.queryBus.execute(
      new CheckPostsNotExistQuery({
        args: {
          postIds,
        },
      }),
    );
  }

  async checkPostsNotExistFromThreadChannels(threadChannels: ThreadChannel[]): Promise<string[]> {
    const postIds = this.postParser.parsePostIdsFromThreadChannels(threadChannels);
    return this.checkPostsNotExist(postIds);
  }

  async findNonExistingThreadPosts(threadPosts: ThreadPost[]): Promise<ThreadPost[]> {
    const threadChannels = threadPosts.map((threadPost) => threadPost.threadChannel);
    const nonExistingPostIds = await this.checkPostsNotExistFromThreadChannels(threadChannels);
    return threadPosts.filter((threadPost) =>
      nonExistingPostIds.includes(this.postParser.parseIdFromChannel(threadPost.threadChannel)),
    );
  }

  async checkPostsNotExistFromMessages(messages: Message[]): Promise<string[]> {
    const postIds = this.postParser.parsePostIdsFromMessages(messages);
    return this.checkPostsNotExist(postIds);
  }

  async findNonExistingMessages(messages: Message[]): Promise<Message[]> {
    const nonExistingPostIds = await this.checkPostsNotExistFromMessages(messages);
    return messages.filter((message) =>
      nonExistingPostIds.includes(this.postParser.parsePostIdFromMessageId(message.id)),
    );
  }
}
