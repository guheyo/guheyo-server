import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { EmojiResponse } from '@lib/domains/emoji/application/dtos/emoji.response';
import { FindEmojisQuery } from '@lib/domains/emoji/application/queries/find-emojis/find-emojis.query';
import { FindEmojisArgs } from '@lib/domains/emoji/application/queries/find-emojis/find-emojis.args';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class EmojiResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [EmojiResponse])
  async findEmojis(@Args() args: FindEmojisArgs): Promise<EmojiResponse[]> {
    const query = new FindEmojisQuery(args);
    return this.queryBus.execute(query);
  }
}
