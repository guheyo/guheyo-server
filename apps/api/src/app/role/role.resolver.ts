import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { FindRoleByIdQuery } from '@lib/domains/role/application/queries/find-my-role-by-id/find-role-by-id.query';
import { CreateRoleInput } from '@lib/domains/role/application/commands/create-role/create-role.input';
import { CreateRoleCommand } from '@lib/domains/role/application/commands/create-role/create-role.command';
import { UpdateRoleInput } from '@lib/domains/role/application/commands/update-role/update-role.input';
import { UpdateRoleCommand } from '@lib/domains/role/application/commands/update-role/update-role.command';
import { DeleteRoleCommand } from '@lib/domains/role/application/commands/delete-role/delete-role.command';
import { UseGuards } from '@nestjs/common';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ADMIN_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
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

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(JwtAccessAuthGuard, RootRoleGuard)
  @Mutation(() => String)
  async createRole(@Args('input') input: CreateRoleInput): Promise<string> {
    await this.commandBus.execute(new CreateRoleCommand(input));
    return input.id;
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(JwtAccessAuthGuard, RootRoleGuard)
  @Mutation(() => String)
  async updateRole(@Args('input') input: UpdateRoleInput): Promise<string> {
    await this.commandBus.execute(new UpdateRoleCommand(input));
    return input.id;
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(JwtAccessAuthGuard, RootRoleGuard)
  @Mutation(() => String)
  async deleteRole(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteRoleCommand(id));
    return id;
  }
}
