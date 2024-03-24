import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { VersionResponse } from '@lib/domains/version/application/dtos/version.response';
import { FindVersionArgs } from '@lib/domains/version/application/queries/find-version/find-version.args';
import { FindVersionQuery } from '@lib/domains/version/application/queries/find-version/find-version.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class VersionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => VersionResponse)
  async findVersion(@Args() args: FindVersionArgs) {
    const query = new FindVersionQuery(args);
    return this.queryBus.execute(query);
  }
}
