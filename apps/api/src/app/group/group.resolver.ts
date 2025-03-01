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
import { FindGroupPreviewsQuery } from '@lib/domains/group/application/queries/find-group-previews/find-group-previews.query';
import { PaginatedGroupProfilesResponse } from '@lib/domains/group/application/queries/find-group-profiles/paginated-group-profiles.response';
import { FindGroupProfilesArgs } from '@lib/domains/group/application/queries/find-group-profiles/find-group-profiles.args';
import { FindGroupProfilesQuery } from '@lib/domains/group/application/queries/find-group-profiles/find-group-profiles.query';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { ADMIN_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { PaginatedCategoriesResponse } from '@lib/domains/group/application/queries/find-categories/paginated-categories.response';
import { FindCategoriesQuery } from '@lib/domains/group/application/queries/find-categories/find-categories.query';
import { FindCategoriesArgs } from '@lib/domains/group/application/queries/find-categories/find-categories.args';
import { FindGroupPreviewsArgs } from '@lib/domains/group/application/queries/find-group-previews/find-group-previews.args';
import { PaginatedGroupPreviewsResponse } from '@lib/domains/group/application/queries/find-group-previews/paginated-group-previews.response';
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

  @Query(() => PaginatedGroupPreviewsResponse)
  async findGroupPreviews(
    @Args() findGroupPreviewsArgs: FindGroupPreviewsArgs,
  ): Promise<PaginatedGroupPreviewsResponse> {
    const query = new FindGroupPreviewsQuery({ args: findGroupPreviewsArgs });
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedCategoriesResponse)
  async findCategories(
    @Args() findCategoriesArgs: FindCategoriesArgs,
  ): Promise<PaginatedCategoriesResponse> {
    const query = new FindCategoriesQuery({ args: findCategoriesArgs });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => MutationResponse)
  async createGroup(@Args('input') input: CreateGroupInput): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateGroupCommand(input));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  @BlocklistRoleNames([])
  @AllowlistRoleNames([ADMIN_ROLE_NAME])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => MutationResponse)
  async updateGroup(@Args('input') input: UpdateGroupInput): Promise<MutationResponse> {
    await this.commandBus.execute(new UpdateGroupCommand(input));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  // NOTE
  // careful deleteGroup
}
