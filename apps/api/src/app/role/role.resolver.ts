import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { FindRoleByIdQuery } from '@lib/domains/role/application/queries/find-my-role-by-id/find-role-by-id.query';
import { CreateRoleInput } from '@lib/domains/role/application/commands/create-role/create-role.input';
import { CreateRoleCommand } from '@lib/domains/role/application/commands/create-role/create-role.command';
import { UpdateRoleInput } from '@lib/domains/role/application/commands/update-role/update-role.input';
import { UpdateRoleCommand } from '@lib/domains/role/application/commands/update-role/update-role.command';
import { DeleteRoleCommand } from '@lib/domains/role/application/commands/delete-role/delete-role.command';

@Resolver()
export class RoleResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => RoleResponse, { nullable: true })
  async findRoleById(@Args('id', { type: () => ID }) id: string): Promise<RoleResponse | null> {
    const query = new FindRoleByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createRole(@Args('input') input: CreateRoleInput): Promise<string> {
    await this.commandBus.execute(new CreateRoleCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateRole(@Args('input') input: UpdateRoleInput): Promise<string> {
    await this.commandBus.execute(new UpdateRoleCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteRole(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteRoleCommand(id));
    return id;
  }
}
