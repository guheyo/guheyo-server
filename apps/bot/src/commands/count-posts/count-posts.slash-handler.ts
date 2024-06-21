import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { CountPostsRequest } from './count-posts.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class CountPostsSlashHandler {
  private readonly logger = new Logger(CountPostsSlashHandler.name);

  protected discordManager: DiscordManager;

  @SlashCommand({
    name: 'count-posts',
    description: 'Count posts',
  })
  public async onCountPosts(
    @Context() [interaction]: SlashCommandContext,
    @Options() { channelId, limit }: CountPostsRequest,
  ) {
    if (!interaction.guild) return;

    this.discordManager = new DiscordManager(interaction.guild);
    const threadPosts = await this.discordManager.fetchThreadPostsFromForum(channelId, limit);

    this.logger.log(`${threadPosts.length} posts exist`);
  }
}
