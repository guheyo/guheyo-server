import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { FindGroupQuery } from '@lib/domains/group/application/queries/find-group/find-group.query';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { Message } from 'discord.js';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { FindTagsQuery } from '@lib/domains/tag/application/queries/find-tags/find-tags.query';
import { GroupParser } from '../parsers/group.parser';
import { GroupErrorMessage } from '../parsers/group.error-message';

@Injectable()
export class GroupClient {
  @Inject()
  private readonly groupParser: GroupParser;

  constructor(readonly queryBus: QueryBus) {}

  async fetchGroupFromMessage(message: Message) {
    const slug = this.groupParser.parseGroupSlugFromMessage(message);
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
}
