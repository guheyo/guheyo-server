import { CreateDemandCommand } from '@lib/domains/demand/application/commands/create-demand/create-demand.command';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { DeleteDemandCommand } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.command';
import { UpdateDemandCommand } from '@lib/domains/demand/application/commands/update-demand/update-demand.command';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { DemandResponse } from '@lib/domains/demand/application/dtos/demand.response';
import { FindDemandQuery } from '@lib/domains/demand/application/queries/find-demand/find-demand.query';
import { FindDemandPreviewsArgs } from '@lib/domains/demand/application/queries/find-demand-previews/find-demand-previews.args';
import { FindDemandPreviewsQuery } from '@lib/domains/demand/application/queries/find-demand-previews/find-demand-previews.query';
import { PaginatedDemandPreviewsResponse } from '@lib/domains/demand/application/queries/find-demand-previews/paginated-demand-previews.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FindDemandArgs } from '@lib/domains/demand/application/queries/find-demand/find-demand.args';
import { DeleteDemandArgs } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.args';
import { BumpDemandInput } from '@lib/domains/demand/application/commands/bump-demand/bump-demand.input';
import { BumpDemandCommand } from '@lib/domains/demand/application/commands/bump-demand/bump-demand.command';
import { DemandPreviewResponse } from '@lib/domains/demand/application/dtos/demand-preview.response';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class DemandResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => DemandResponse, { nullable: true })
  async findDemand(
    @Args() findDemandArgs: FindDemandArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<DemandResponse | null> {
    const query = new FindDemandQuery({
      args: findDemandArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedDemandPreviewsResponse)
  async findDemandPreviews(
    @Args() findDemandPreviewsArgs: FindDemandPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindDemandPreviewsQuery({
      args: findDemandPreviewsArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createDemand(
    @Args('input') input: CreateDemandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateDemandCommand({ input, user }));
    return input.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => DemandPreviewResponse)
  async updateDemand(
    @Args('input') input: UpdateDemandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<DemandPreviewResponse> {
    return this.commandBus.execute(new UpdateDemandCommand({ input, user }));
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async deleteDemand(
    @Args() args: DeleteDemandArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteDemandCommand({ args, user }));
    return args.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => DemandPreviewResponse)
  async bumpDemand(
    @Args('input') input: BumpDemandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<DemandPreviewResponse> {
    return this.commandBus.execute(new BumpDemandCommand({ input, user }));
  }
}
