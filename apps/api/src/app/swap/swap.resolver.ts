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
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FindSwapArgs } from '@lib/domains/swap/application/queries/find-swap/find-swap.args';
import { DeleteSwapArgs } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.args';
import { AuthorIdPath } from '@lib/domains/auth/decorators/author-id-path/author-id-path.decorator';
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { BumpSwapInput } from '@lib/domains/swap/application/commands/bump-swap/bump-swap.input';
import { BumpSwapCommand } from '@lib/domains/swap/application/commands/bump-swap/bump-swap.command';
import { SwapPreviewResponse } from '@lib/domains/swap/application/dtos/swap-preview.response';
import { JwtAccessAllGuard } from '@lib/domains/auth/guards/jwt/jwt-access-all.guard';
import { AuthUser } from '@lib/domains/auth/decorators/auth-user/auth-user.decorator';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SwapResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAccessAllGuard)
  @Query(() => SwapResponse, { nullable: true })
  async findSwap(
    @Args() findSwapArgs: FindSwapArgs,
    @AuthUser() user: any,
  ): Promise<SwapResponse | null> {
    const query = new FindSwapQuery({
      args: findSwapArgs,
      userId: user?.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(JwtAccessAllGuard)
  @Query(() => PaginatedSwapPreviewsResponse)
  async findSwapPreviews(
    @Args() findSwapPreviewsArgs: FindSwapPreviewsArgs,
    @AuthUser() user: any,
  ) {
    const query = new FindSwapPreviewsQuery({
      args: findSwapPreviewsArgs,
      userId: user?.id,
    });
    return this.queryBus.execute(query);
  }

  @AuthorIdPath('input.proposerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async createSwap(@Args('input') input: CreateSwapInput): Promise<string> {
    await this.commandBus.execute(new CreateSwapCommand(input));
    return input.id;
  }

  @AuthorIdPath('input.proposerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => SwapPreviewResponse)
  async updateSwap(@Args('input') input: UpdateSwapInput): Promise<SwapPreviewResponse> {
    return this.commandBus.execute(new UpdateSwapCommand(input));
  }

  @AuthorIdPath('proposerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async deleteSwap(@Args() args: DeleteSwapArgs): Promise<string> {
    await this.commandBus.execute(new DeleteSwapCommand(args));
    return args.id;
  }

  @AuthorIdPath('input.proposerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => SwapPreviewResponse)
  async bumpSwap(@Args('input') input: BumpSwapInput): Promise<SwapPreviewResponse> {
    return this.commandBus.execute(new BumpSwapCommand(input));
  }
}
