import { CreateDemandCommand } from '@lib/domains/demand/application/commands/create-demand/create-demand.command';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { DeleteDemandCommand } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.command';
import { UpdateDemandCommand } from '@lib/domains/demand/application/commands/update-demand/update-demand.command';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { DemandResponse } from '@lib/domains/demand/application/dtos/demand.response';
import { FindDemandByIdQuery } from '@lib/domains/demand/application/queries/find-demand-by-id/find-demand-by-id.query';
import { FindDemandQuery } from '@lib/domains/demand/application/queries/find-demand/find-demand.query';
import { FindDemandsArgs } from '@lib/domains/demand/application/queries/find-demands/find-demands.args';
import { FindDemandsQuery } from '@lib/domains/demand/application/queries/find-demands/find-demands.query';
import { PaginatedDemandsResponse } from '@lib/domains/demand/application/queries/find-demands/paginated-demands.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DemandResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => DemandResponse, { nullable: true })
  async findDemandById(@Args('id', { type: () => ID }) id: string): Promise<DemandResponse | null> {
    const query = new FindDemandByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => DemandResponse, { nullable: true })
  async findDemand(@Args('slug') slug: string): Promise<DemandResponse | null> {
    const query = new FindDemandQuery(slug);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedDemandsResponse)
  async findDemands(@Args() findDemandsArgs: FindDemandsArgs) {
    const query = new FindDemandsQuery(findDemandsArgs);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createDemand(@Args('input') input: CreateDemandInput): Promise<string> {
    await this.commandBus.execute(new CreateDemandCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateDemand(@Args('input') input: UpdateDemandInput): Promise<string> {
    await this.commandBus.execute(new UpdateDemandCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteDemand(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteDemandCommand(id));
    return id;
  }
}
