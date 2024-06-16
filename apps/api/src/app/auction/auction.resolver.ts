import { CreateAuctionCommand } from '@lib/domains/auction/application/commands/create-auction/create-auction.command';
import { CreateAuctionInput } from '@lib/domains/auction/application/commands/create-auction/create-auction.input';
import { UpdateAuctionCommand } from '@lib/domains/auction/application/commands/update-auction/update-auction.command';
import { UpdateAuctionInput } from '@lib/domains/auction/application/commands/update-auction/update-auction.input';
import { AuctionResponse } from '@lib/domains/auction/application/dtos/auction.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CancelBidInput } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.input';
import { CancelBidCommand } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.command';
import { UseGuards } from '@nestjs/common';
import { FindAuctionPreviewsArgs } from '@lib/domains/auction/application/queries/find-auction-previews/find-auction-previews.args';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { PaginatedAuctionPreviewsResponse } from '@lib/domains/auction/application/queries/find-auction-previews/paginated-auction-previews.response';
import { FindAuctionPreviewsQuery } from '@lib/domains/auction/application/queries/find-auction-previews/find-auction-previews.query';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindAuctionQuery } from '@lib/domains/auction/application/queries/find-auction/find-auction.query';
import { FindAuctionArgs } from '@lib/domains/auction/application/queries/find-auction/find-auction.args';
import { PaginatedBidsResponse } from '@lib/domains/auction/application/queries/find-bids/paginated-bids.response';
import { FindBidsArgs } from '@lib/domains/auction/application/queries/find-bids/find-bids.args';
import { FindBidsQuery } from '@lib/domains/auction/application/queries/find-bids/find-bids.query';
import { PlaceBidInput } from '@lib/domains/auction/application/commands/place-bid/place-bid.input';
import { PlaceBidCommand } from '@lib/domains/auction/application/commands/place-bid/place-bid.command';
import { BidResponse } from '@lib/domains/auction/application/dtos/bid.response';
import { BidPlacedArgs } from '@lib/domains/auction/application/subscriptions/bid-placed/bid-placed.args';
import { parseBidPlacedTriggerName } from '@lib/domains/auction/application/subscriptions/bid-placed/parse-bid-placed-trigger-name';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { CancelBidResponse } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.response';
import { BidCanceledArgs } from '@lib/domains/auction/application/subscriptions/bid-canceled/bid-canceled.args';
import { parseBidCanceledTriggerName } from '@lib/domains/auction/application/subscriptions/bid-canceled/parse-bid-canceled-trigger-name';
import { PaginatedAuctionInteractionItemsResponse } from '@lib/domains/auction/application/queries/find-auction-interaction-items/paginated-auction-interaction-items.response';
import { FindAuctionInteractionItemsQuery } from '@lib/domains/auction/application/queries/find-auction-interaction-items/find-auction-interaction-items.query';
import { FindAuctionInteractionItemsArgs } from '@lib/domains/auction/application/queries/find-auction-interaction-items/find-auction-interaction-items.args';
import { BidCountResponse } from '@lib/domains/auction/application/dtos/bid-count.response';
import { FindBidCountArgs } from '@lib/domains/auction/application/queries/find-bid-count/find-bid-count.args';
import { FindBidCountQuery } from '@lib/domains/auction/application/queries/find-bid-count/find-bid-count.query';
import { AuctionUpdatedArgs } from '@lib/domains/auction/application/subscriptions/auction-updated/auction-updated.args';
import { parseAuctionUpdatedTriggerName } from '@lib/domains/auction/application/subscriptions/auction-updated/parse-auction-updated-trigger-name';
import { UpdatedAuctionResponse } from '@lib/domains/auction/application/commands/update-auction/updated-auction.response';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { TimeGuard } from '@lib/shared/time/time.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards()
@Resolver()
export class AuctionResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => AuctionResponse, { nullable: true })
  async findAuction(
    @Args() args: FindAuctionArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<AuctionResponse | null> {
    const query = new FindAuctionQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedAuctionPreviewsResponse)
  async findAuctionPreviews(
    @Args() args: FindAuctionPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedAuctionPreviewsResponse> {
    const query = new FindAuctionPreviewsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedBidsResponse)
  async findBids(@Args() args: FindBidsArgs, @ExtractedUser() user: MyUserResponse) {
    const query = new FindBidsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedAuctionInteractionItemsResponse)
  async findAuctionInteractionItems(
    @Args() args: FindAuctionInteractionItemsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindAuctionInteractionItemsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard)
  @Query(() => BidCountResponse)
  async findBidCount(@Args() args: FindBidCountArgs) {
    const query = new FindBidCountQuery(args);
    return this.queryBus.execute(query);
  }

  @UseGuards(new TimeGuard(2, 6))
  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async createAuction(
    @Args('input') input: CreateAuctionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateAuctionCommand({ input, user }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async updateAuction(
    @Args('input') input: UpdateAuctionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new UpdateAuctionCommand({ input, user }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async placeBid(
    @Args('input') input: PlaceBidInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new PlaceBidCommand({ input, user }));
    return input.auctionId;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async cancelBid(
    @Args('input') input: CancelBidInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CancelBidCommand({ input, user }));
    return input.auctionId;
  }

  @Subscription(() => BidResponse)
  async bidPlaced(@Args() args: BidPlacedArgs) {
    return GraphqlPubSub.asyncIterator(parseBidPlacedTriggerName(args.auctionId));
  }

  @Subscription(() => CancelBidResponse)
  async bidCanceled(@Args() args: BidCanceledArgs) {
    return GraphqlPubSub.asyncIterator(parseBidCanceledTriggerName(args.auctionId));
  }

  @Subscription(() => UpdatedAuctionResponse)
  async auctionUpdated(@Args() args: AuctionUpdatedArgs) {
    return GraphqlPubSub.asyncIterator(parseAuctionUpdatedTriggerName(args.auctionId));
  }
}
