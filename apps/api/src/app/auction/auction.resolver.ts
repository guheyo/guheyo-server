import { CreateAuctionCommand } from '@lib/domains/auction/application/commands/create-auction/create-auction.command';
import { CreateAuctionInput } from '@lib/domains/auction/application/commands/create-auction/create-auction.input';
import { AddBidInput } from '@lib/domains/auction/application/commands/add-bid/add-bid.input';
import { UpdateAuctionCommand } from '@lib/domains/auction/application/commands/update-auction/update-auction.command';
import { UpdateAuctionInput } from '@lib/domains/auction/application/commands/update-auction/update-auction.input';
import { AuctionResponse } from '@lib/domains/auction/application/dtos/auction.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddBidCommand } from '@lib/domains/auction/application/commands/add-bid/add-bid.command';
import { CancelBidInput } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.input';
import { CancelBidCommand } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.command';
import { UseGuards } from '@nestjs/common';
import { FindAuctionPreviewsArgs } from '@lib/domains/auction/application/queries/find-auction-previews/find-auction-previews.args';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { PaginatedAuctionPreviewsResponse } from '@lib/domains/auction/application/queries/find-auction-previews/paginated-auction-previews.response';
import { FindAuctionPreviewsQuery } from '@lib/domains/auction/application/queries/find-auction-previews/find-auction-previews.query';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindAuctionQuery } from '@lib/domains/auction/application/queries/find-auction/find-auction.query';
import { FindAuctionArgs } from '@lib/domains/auction/application/queries/find-auction/find-auction.args';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class AuctionResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => AuctionResponse, { nullable: true })
  async findAuction(
    @Args() args: FindAuctionArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<AuctionResponse | null> {
    const query = new FindAuctionQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedAuctionPreviewsResponse)
  async findAuctionPreviews(
    @Args() args: FindAuctionPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedAuctionPreviewsResponse> {
    const query = new FindAuctionPreviewsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createAuction(
    @Args('input') input: CreateAuctionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateAuctionCommand({ input, user }));
    return input.id;
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async updateAuction(
    @Args('input') input: UpdateAuctionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new UpdateAuctionCommand({ input, user }));
    return input.id;
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async addBid(
    @Args('input') input: AddBidInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new AddBidCommand({ input, user }));
    return input.auctionId;
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async cancelBid(
    @Args('input') input: CancelBidInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CancelBidCommand({ input, user }));
    return input.auctionId;
  }
}
