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
import { CommentDemandReportInput } from '@lib/domains/demand/application/commands/comment-demand-report/comment-demand-report.input';
import { CommentDemandReportCommand } from '@lib/domains/demand/application/commands/comment-demand-report/comment-demand-report.command';
import { DemandPreviewResponse } from '@lib/domains/demand/application/dtos/demand-preview.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class DemandResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => DemandResponse, { nullable: true })
  async findDemand(@Args() findDemandArgs: FindDemandArgs): Promise<DemandResponse | null> {
    const query = new FindDemandQuery(findDemandArgs);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedDemandPreviewsResponse)
  async findDemandPreviews(@Args() findDemandPreviewsArgs: FindDemandPreviewsArgs) {
    const query = new FindDemandPreviewsQuery(findDemandPreviewsArgs);
    return this.queryBus.execute(query);
  }

  @AuthorIdPath('input.buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
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

  @AuthorIdPath('input.buyerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
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

  @AuthorIdPath('input.authorId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async commentDemandReport(@Args('input') input: CommentDemandReportInput): Promise<string> {
    await this.commandBus.execute(new CommentDemandReportCommand(input));
    return input.id;
  }
}
