import { Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { PlatformResponse } from '@lib/domains/platform/application/dtos/platform.response';
import { FindPlatformsQuery } from '@lib/domains/platform/application/queries/find-platforms/find-platforms.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class PlatformResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [PlatformResponse])
  async findPlatforms(): Promise<PlatformResponse[]> {
    const query = new FindPlatformsQuery();
    return this.queryBus.execute(query);
  }
}
