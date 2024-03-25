import { Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SessionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
}
