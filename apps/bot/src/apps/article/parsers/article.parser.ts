import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { Injectable } from '@nestjs/common';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { CreateArticleInput } from '@lib/domains/article/application/commands/create-article/create-article.input';
import { ARTICLE } from '@lib/domains/article/domain/article.constants';

@Injectable()
export class ArticleParser extends GroupParser {
  parseCreateArticleInput(threadPost: ThreadPost, group: GroupResponse): CreateArticleInput {
    const channelName = this.parseChannelName(threadPost.threadChannel.parent?.name || '');
    const post = {
      id: this.parseIdFromChannelId(threadPost.threadChannel.id),
      createdAt: threadPost.starterMessage.createdAt,
      updatedAt: threadPost.starterMessage.editedAt || threadPost.starterMessage.createdAt,
      type: ARTICLE,
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
}
