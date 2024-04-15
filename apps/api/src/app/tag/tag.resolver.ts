import { Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { FindTagsQuery } from '@lib/domains/tag/application/queries/find-tags/find-tags.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class TagResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [TagResponse])
  async findTags(): Promise<TagResponse[]> {
    const query = new FindTagsQuery();
    return this.queryBus.execute(query);
  }
}
