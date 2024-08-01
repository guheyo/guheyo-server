import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { ThreadClient } from '@app/bot/apps/thread/clients/thread.client';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ThreadChannel } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashHandler } from './bulk-save-posts.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveThreadsSlashHandler extends BulkSavePostsSlashHandler {
  constructor(protected readonly threadClient: ThreadClient) {
    super(BulkSaveThreadsSlashHandler.name);
  }

  async saveThreadPost(threadPost: ThreadPost, group: GroupResponse) {
    try {
      const channelId = (threadPost.starterMessage.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const { author } = threadPost.starterMessage;
      const user = await this.userClient.fetchMyUser('discord', author);
      await this.threadClient.createThreadFromPost(user, threadPost, group);
    } catch (error: any) {
      this.logger.error(`Failed to save thread post: ${error.message}`, error.stack);
    }
  }

  @SlashCommand({
    name: 'bulk-save-threads',
    description: 'Bulk Save Threads',
  })
  public async onBuckSaveThreads(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;

    const channel = this.groupParser.discordConfigService.findThreadChannel(
      guildName,
      categoryName,
    );
    if (!channel) return;

    await this.bulkSave(interaction.guild, guildName, channel.id, limit);
  }
}
