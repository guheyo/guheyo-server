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
import { AuthorIdPath } from '@lib/domains/auth/decorators/author-id-path/author-id-path.decorator';
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { BumpDemandInput } from '@lib/domains/demand/application/commands/bump-demand/bump-demand.input';
import { BumpDemandCommand } from '@lib/domains/demand/application/commands/bump-demand/bump-demand.command';
import { DemandPreviewResponse } from '@lib/domains/demand/application/dtos/demand-preview.response';
import { JwtAccessAllGuard } from '@lib/domains/auth/guards/jwt/jwt-access-all.guard';
import { ExtractedJwtPayload } from '@lib/domains/auth/decorators/extracted-jwt-payload/extracted-jwt-payload.decorator';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class DemandResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAccessAllGuard)
  @Query(() => DemandResponse, { nullable: true })
  async findDemand(
    @Args() findDemandArgs: FindDemandArgs,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ): Promise<DemandResponse | null> {
    const query = new FindDemandQuery({
      args: findDemandArgs,
      userId: jwtPayload.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(JwtAccessAllGuard)
  @Query(() => PaginatedDemandPreviewsResponse)
  async findDemandPreviews(
    @Args() findDemandPreviewsArgs: FindDemandPreviewsArgs,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ) {
    const query = new FindDemandPreviewsQuery({
      args: findDemandPreviewsArgs,
      userId: jwtPayload.id,
    });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @AuthorIdPath('input.buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard, RootRoleGuard)
  @Mutation(() => String)
  async createDemand(@Args('input') input: CreateDemandInput): Promise<string> {
    await this.commandBus.execute(new CreateDemandCommand(input));
    return input.id;
  }

  @AuthorIdPath('input.buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => DemandPreviewResponse)
  async updateDemand(@Args('input') input: UpdateDemandInput): Promise<DemandPreviewResponse> {
    return this.commandBus.execute(new UpdateDemandCommand(input));
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @AuthorIdPath('buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard, RootRoleGuard)
  @Mutation(() => String)
  async deleteDemand(@Args() args: DeleteDemandArgs): Promise<string> {
    await this.commandBus.execute(new DeleteDemandCommand(args));
    return args.id;
  }

  @AuthorIdPath('input.buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => DemandPreviewResponse)
  async bumpDemand(@Args('input') input: BumpDemandInput): Promise<DemandPreviewResponse> {
    return this.commandBus.execute(new BumpDemandCommand(input));
  }
}
