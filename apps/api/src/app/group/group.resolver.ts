import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { FindGroupByIdQuery } from '@lib/domains/group/application/queries/find-group-by-id/find-group-by-id.query';
import { CreateGroupInput } from '@lib/domains/group/application/commands/create-group/create-group.input';
import { CreateGroupCommand } from '@lib/domains/group/application/commands/create-group/create-group.command';
import { UpdateGroupInput } from '@lib/domains/group/application/commands/update-group/update-group.input';
import { UpdateGroupCommand } from '@lib/domains/group/application/commands/update-group/update-group.command';
import { DeleteGroupCommand } from '@lib/domains/group/application/commands/delete-group/delete-group.command';
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

@Resolver()
export class GroupResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => GroupResponse, { nullable: true })
  async findGroupById(@Args('id', { type: () => ID }) id: string): Promise<GroupResponse | null> {
    const query = new FindGroupByIdQuery(id);
    return this.queryBus.execute(query);
  }

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
    const query = new FindGroupProfilesQuery(findGroupProfilesArgs);
    return this.queryBus.execute(query);
  }

  @Query(() => [GroupPreviewResponse])
  async findGroupPreviews(): Promise<GroupPreviewResponse[]> {
    const query = new FindGroupPreviewsQuery();
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createGroup(@Args('input') input: CreateGroupInput): Promise<string> {
    await this.commandBus.execute(new CreateGroupCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateGroup(@Args('input') input: UpdateGroupInput): Promise<string> {
    await this.commandBus.execute(new UpdateGroupCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteGroup(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteGroupCommand(id));
    return id;
  }
}
