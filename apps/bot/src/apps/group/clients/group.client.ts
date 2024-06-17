import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { FindGroupQuery } from '@lib/domains/group/application/queries/find-group/find-group.query';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { FindTagsQuery } from '@lib/domains/tag/application/queries/find-tags/find-tags.query';
import { Client, GuildMember } from 'discord.js';
import { GroupParser } from '../parsers/group.parser';
import { GroupErrorMessage } from '../parsers/group.error-message';

@Injectable()
export class GroupClient {
  @Inject()
  private readonly groupParser: GroupParser;

  constructor(
    readonly queryBus: QueryBus,
    private readonly client: Client,
  ) {}

  // NOTE: This approach is not suitable as multiple guilds may share the same server.
  async fetchGroupByGuildId(guildId: string) {
    const slug = this.groupParser.parseGroupSlugByGuildId(guildId);
    if (!slug) throw new RpcException(GroupErrorMessage.NOT_FOUND_GROUP_SLUG);

    const group = await this.findGroup(slug);
    if (!group) throw new RpcException(GroupErrorMessage.NOT_FOUND_GUILD);
    return group;
  }

  async fetchGroupByGuildName(guildName: string) {
    const slug = this.groupParser.parseGroupSlugByGuildName(guildName);
    if (!slug) throw new RpcException(GroupErrorMessage.NOT_FOUND_GROUP_SLUG);

    const group = await this.findGroup(slug);
    if (!group) throw new RpcException(GroupErrorMessage.NOT_FOUND_GUILD);
    return group;
  }

  async fetchGroupByChannelId(channelId: string) {
    const slug = this.groupParser.parseGroupSlugByChannelId(channelId);
    if (!slug) throw new RpcException(GroupErrorMessage.NOT_FOUND_GROUP_SLUG);

    const group = await this.findGroup(slug);
    if (!group) throw new RpcException(GroupErrorMessage.NOT_FOUND_GUILD);
    return group;
  }

  async findGroup(slug: string): Promise<GroupResponse | null> {
    return this.queryBus.execute(new FindGroupQuery({ slug }));
  }

  async fetchTags(): Promise<TagResponse[]> {
    return this.queryBus.execute(new FindTagsQuery());
  }

  async fetchMembers(guildId: string, limit: number): Promise<GuildMember[]> {
    const guild = await this.client.guilds.fetch(guildId);
    const members = await guild.members.fetch({
      limit,
    });
    return members.map((m) => m);
  }
}
