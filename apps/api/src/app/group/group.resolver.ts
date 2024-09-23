import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { CreateGroupInput } from '@lib/domains/group/application/commands/create-group/create-group.input';
import { CreateGroupCommand } from '@lib/domains/group/application/commands/create-group/create-group.command';
import { UpdateGroupInput } from '@lib/domains/group/application/commands/update-group/update-group.input';
import { UpdateGroupCommand } from '@lib/domains/group/application/commands/update-group/update-group.command';
import { FindGroupsQuery } from '@lib/domains/group/application/queries/find-groups/find-groups.query';
import { PaginatedGroupsResponse } from '@lib/domains/group/application/queries/find-groups/paginated-groups.response';
import { FindGroupsArgs } from '@lib/domains/group/application/queries/find-groups/find-groups.args';
import { FindGroupQuery } from '@lib/domains/group/application/queries/find-group/find-group.query';
import { FindGroupArgs } from '@lib/domains/group/application/queries/find-group/find-group.args';
import { GroupPreviewResponse } from '@lib/domains/group/application/dtos/group-preview.response';
import { FindGroupPreviewsQuery } from '@lib/domains/group/application/queries/find-group-previews/find-group-previews.query';
import { PaginatedGroupProfilesResponse } from '@lib/domains/group/application/queries/find-group-profiles/paginated-group-profiles.response';
import { FindGroupProfilesArgs } from '@lib/domains/group/application/queries/find-group-profiles/find-group-profiles.args';
import { FindGroupProfilesQuery } from '@lib/domains/group/application/queries/find-group-profiles/find-group-profiles.query';
import { UseGuards } from '@nestjs/common';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { ADMIN_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class GroupResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => GroupResponse, { nullable: true })
  async findGroup(@Args() args: FindGroupArgs): Promise<GroupResponse | null> {
    const query = new FindGroupQuery(args);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedGroupsResponse)
  async findGroups(@Args() findGroupsArgs: FindGroupsArgs): Promise<PaginatedGroupsResponse> {
    const query = new FindGroupsQuery(findGroupsArgs);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedGroupProfilesResponse)
  async findGroupProfiles(
    @Args() findGroupProfilesArgs: FindGroupProfilesArgs,
  ): Promise<PaginatedGroupProfilesResponse> {
    const query = new FindGroupProfilesQuery({ args: findGroupProfilesArgs });
    return this.queryBus.execute(query);
  }

  @Query(() => [GroupPreviewResponse])
  async findGroupPreviews(): Promise<GroupPreviewResponse[]> {
    const query = new FindGroupPreviewsQuery();
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createGroup(@Args('input') input: CreateGroupInput): Promise<string> {
    await this.commandBus.execute(new CreateGroupCommand(input));
    return input.id;
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async updateGroup(@Args('input') input: UpdateGroupInput): Promise<string> {
    await this.commandBus.execute(new UpdateGroupCommand(input));
    return input.id;
  }

  // NOTE
  // careful deleteGroup
}
