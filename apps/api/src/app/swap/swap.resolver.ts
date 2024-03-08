import { CreateSwapCommand } from '@lib/domains/swap/application/commands/create-swap/create-swap.command';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { DeleteSwapCommand } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.command';
import { UpdateSwapCommand } from '@lib/domains/swap/application/commands/update-swap/update-swap.command';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { SwapResponse } from '@lib/domains/swap/application/dtos/swap.response';
import { FindSwapQuery } from '@lib/domains/swap/application/queries/find-swap/find-swap.query';
import { FindSwapPreviewsArgs } from '@lib/domains/swap/application/queries/find-swap-previews/find-swap-previews.args';
import { FindSwapPreviewsQuery } from '@lib/domains/swap/application/queries/find-swap-previews/find-swap-previews.query';
import { PaginatedSwapPreviewsResponse } from '@lib/domains/swap/application/queries/find-swap-previews/paginated-swap-previews.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FindSwapArgs } from '@lib/domains/swap/application/queries/find-swap/find-swap.args';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SwapResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => SwapResponse, { nullable: true })
  async findSwap(@Args() findSwapArgs: FindSwapArgs): Promise<SwapResponse | null> {
    const query = new FindSwapQuery(findSwapArgs);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedSwapPreviewsResponse)
  async findSwapPreviews(@Args() findSwapPreviewsArgs: FindSwapPreviewsArgs) {
    const query = new FindSwapPreviewsQuery(findSwapPreviewsArgs);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createSwap(@Args('input') input: CreateSwapInput): Promise<string> {
    await this.commandBus.execute(new CreateSwapCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateSwap(@Args('input') input: UpdateSwapInput): Promise<string> {
    await this.commandBus.execute(new UpdateSwapCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteSwap(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteSwapCommand(id));
    return id;
  }
}
