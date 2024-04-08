import { Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { MannerTagResponse } from '@lib/domains/manner-tag/application/dtos/manner-tag.response';
import { FindMannerTagsQuery } from '@lib/domains/manner-tag/application/queries/find-manner-tags/find-manner-tags.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class MannerTagResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [MannerTagResponse])
  async findMannerTags(): Promise<MannerTagResponse[]> {
    const query = new FindMannerTagsQuery();
    return this.queryBus.execute(query);
  }
}
