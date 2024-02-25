import { TermResponse } from '@lib/domains/term/application/dtos/term.response';
import { FindTermQuery } from '@lib/domains/term/application/queries/find-term/find-term.query';
import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class TermResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TermResponse, { nullable: true })
  async findTerm(@Args('name') name: string): Promise<TermResponse | null> {
    const query = new FindTermQuery(name);
    return this.queryBus.execute(query);
  }
}
