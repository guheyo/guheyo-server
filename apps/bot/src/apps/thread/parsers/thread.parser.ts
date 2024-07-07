import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { Injectable } from '@nestjs/common';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { CreateThreadInput } from '@lib/domains/thread/application/commands/create-thread/create-thread.input';
import { THREAD } from '@lib/domains/thread/domain/thread.constants';
import { UpdateThreadInput } from '@lib/domains/thread/application/commands/update-thread/update-thread.input';

@Injectable()
export class ThreadParser extends GroupParser {
  parseCreateThreadInput(threadPost: ThreadPost, group: GroupResponse): CreateThreadInput {
    const channelName = this.parseChannelName(threadPost.threadChannel.parent?.name || '');
    const post = {
      id: this.parseIdFromChannelId(threadPost.threadChannel.id),
      createdAt: threadPost.starterMessage.createdAt,
      updatedAt: threadPost.starterMessage.editedAt || threadPost.starterMessage.createdAt,
      type: THREAD,
      title: threadPost.threadChannel.name,
      groupId: group.id,
      tagNames: threadPost.tagNames,
      categoryId: this.parseCategoryId(channelName, group),
      userAgent: DISCORD,
    };

    return {
      id: this.parseIdFromMessageId(threadPost.starterMessage.id),
      post,
      content: threadPost.starterMessage.content,
    };
  }

  parseUpdateThreadInput(threadPost: ThreadPost): UpdateThreadInput {
    const post = {
      title: threadPost.threadChannel.name,
    };
    return {
      post,
      id: this.parseIdFromMessageId(threadPost.starterMessage.id),
      content: threadPost.starterMessage.content,
    };
  }
}
