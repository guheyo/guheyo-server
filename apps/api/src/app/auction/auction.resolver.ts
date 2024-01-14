import { CreateAuctionCommand } from '@lib/domains/auction/application/commands/create-auction/create-auction.command';
import { CreateAuctionInput } from '@lib/domains/auction/application/commands/create-auction/create-auction.input';
import { AddBidInput } from '@lib/domains/auction/application/commands/add-bid/add-bid.input';
import { DeleteAuctionCommand } from '@lib/domains/auction/application/commands/delete-auction/delete-auction.command';
import { UpdateAuctionCommand } from '@lib/domains/auction/application/commands/update-auction/update-auction.command';
import { UpdateAuctionInput } from '@lib/domains/auction/application/commands/update-auction/update-auction.input';
import { AuctionResponse } from '@lib/domains/auction/application/dtos/auction.response';
import { FindAuctionByIdQuery } from '@lib/domains/auction/application/queries/find-auction-by-id/find-auction-by-id.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddBidCommand } from '@lib/domains/auction/application/commands/add-bid/add-bid.command';
import { CancelBidInput } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.input';
import { CancelBidCommand } from '@lib/domains/auction/application/commands/cancel-bid/cancel-bid.command';

@Resolver()
export class AuctionResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => AuctionResponse, { nullable: true })
  async findAuctionById(@Args('id') id: string): Promise<AuctionResponse | null> {
    const query = new FindAuctionByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createAuction(@Args('input') input: CreateAuctionInput): Promise<string> {
    await this.commandBus.execute(new CreateAuctionCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateAuction(@Args('input') input: UpdateAuctionInput): Promise<string> {
    await this.commandBus.execute(new UpdateAuctionCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteAuction(@Args('id') id: string): Promise<string> {
    await this.commandBus.execute(new DeleteAuctionCommand(id));
    return id;
  }

  @Mutation(() => String)
  async addBid(@Args('input') input: AddBidInput): Promise<string> {
    await this.commandBus.execute(new AddBidCommand(input));
    return input.auctionId;
  }

  @Mutation(() => String)
  async cancelBid(@Args('input') input: CancelBidInput): Promise<string> {
    await this.commandBus.execute(new CancelBidCommand(input));
    return input.auctionId;
  }
}
