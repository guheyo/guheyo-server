import { CreateSwapCommand } from '@lib/domains/swap/application/commands/create-swap/create-swap.command';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { DeleteSwapCommand } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.command';
import { UpdateSwapCommand } from '@lib/domains/swap/application/commands/update-swap/update-swap.command';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { SwapResponse } from '@lib/domains/swap/application/dtos/swap.response';
import { FindSwapByIdQuery } from '@lib/domains/swap/application/queries/find-swap-by-id/find-swap-by-id.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class SwapResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => SwapResponse, { nullable: true })
  async findSwapById(@Args('id') id: string): Promise<SwapResponse | null> {
    const query = new FindSwapByIdQuery(id);
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
  async deleteSwap(@Args('id') id: string): Promise<string> {
    await this.commandBus.execute(new DeleteSwapCommand(id));
    return id;
  }
}
