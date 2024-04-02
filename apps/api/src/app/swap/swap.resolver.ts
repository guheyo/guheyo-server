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
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { BumpSwapInput } from '@lib/domains/swap/application/commands/bump-swap/bump-swap.input';
import { BumpSwapCommand } from '@lib/domains/swap/application/commands/bump-swap/bump-swap.command';
import { SwapPreviewResponse } from '@lib/domains/swap/application/dtos/swap-preview.response';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SwapResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => SwapResponse, { nullable: true })
  async findSwap(
    @Args() findSwapArgs: FindSwapArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<SwapResponse | null> {
    const query = new FindSwapQuery({
      args: findSwapArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedSwapPreviewsResponse)
  async findSwapPreviews(
    @Args() findSwapPreviewsArgs: FindSwapPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindSwapPreviewsQuery({
      args: findSwapPreviewsArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @AuthorIdPath('input.proposerId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard, RootRoleGuard)
  @Mutation(() => String)
  async createSwap(
    @Args('input') input: CreateSwapInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateSwapCommand({ input, user }));
    return input.id;
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @AuthorIdPath('input.proposerId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard, RootRoleGuard)
  @Mutation(() => SwapPreviewResponse)
  async updateSwap(
    @Args('input') input: UpdateSwapInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<SwapPreviewResponse> {
    return this.commandBus.execute(new UpdateSwapCommand({ input, user }));
  }

  @AuthorIdPath('proposerId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard)
  @Mutation(() => String)
  async deleteSwap(@Args() args: DeleteSwapArgs): Promise<string> {
    await this.commandBus.execute(new DeleteSwapCommand(args));
    return args.id;
  }

  @AuthorIdPath('input.proposerId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard)
  @Mutation(() => SwapPreviewResponse)
  async bumpSwap(@Args('input') input: BumpSwapInput): Promise<SwapPreviewResponse> {
    return this.commandBus.execute(new BumpSwapCommand(input));
  }
}
