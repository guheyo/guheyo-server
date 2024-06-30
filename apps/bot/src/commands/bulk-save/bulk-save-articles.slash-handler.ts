import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { ArticleClient } from '@app/bot/apps/article/clients/article.client';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ThreadChannel } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashHandler } from './bulk-save-posts.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveArticlesSlashHandler extends BulkSavePostsSlashHandler {
  constructor(protected readonly articleClient: ArticleClient) {
    super(BulkSaveArticlesSlashHandler.name);
  }

  async saveThreadPost(threadPost: ThreadPost, group: GroupResponse) {
    try {
      const channelId = (threadPost.starterMessage.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const { author } = threadPost.starterMessage;
      const user = await this.userClient.fetchMyUser('discord', author);
      const tags = await this.groupClient.fetchTags();
      await this.articleClient.createArticleFromPost(user, threadPost, group, tags);
    } catch (error: any) {
      this.logger.error(`Failed to save thread post: ${error.message}`, error.stack);
    }
  }

  @SlashCommand({
    name: 'bulk-save-articles',
    description: 'Bulk Save Articles',
  })
  public async onBuckSaveArticles(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;

    const channelId = this.groupParser.discordConfigService.findCommunityChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    await this.bulkSave(interaction.guild, guildName, channelId, limit);
  }
}
