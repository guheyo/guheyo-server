import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { CreateReportInput } from '@lib/domains/report/application/commands/create-report/create-report.input';
import { CreateReportCommand } from '@lib/domains/report/application/commands/create-report/create-report.command';
import { ReportResponse } from '@lib/domains/report/application/dtos/report.response';
import { FindReportArgs } from '@lib/domains/report/application/queries/find-report/find-report.args';
import { FindReportQuery } from '@lib/domains/report/application/queries/find-report/find-report.query';
import { PaginatedReportPreviewsResponse } from '@lib/domains/report/application/queries/find-report-previews/paginated-report-previews.response';
import { FindReportPreviewsArgs } from '@lib/domains/report/application/queries/find-report-previews/find-report-previews.args';
import { FindReportPreviewsQuery } from '@lib/domains/report/application/queries/find-report-previews/find-report-previews.query';
import { CommentReportInput } from '@lib/domains/report/application/commands/comment-report/comment-report.input';
import { CommentReportCommand } from '@lib/domains/report/application/commands/comment-report/comment-report.command';
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { AuthorIdPath } from '@lib/domains/auth/decorators/author-id-path/author-id-path.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { JwtAccessAllGuard } from '@lib/domains/auth/guards/jwt/jwt-access-all.guard';
import { ExtractedJwtPayload } from '@lib/domains/auth/decorators/extracted-jwt-payload/extracted-jwt-payload.decorator';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class ReportResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => ReportResponse)
  async findReport(@Args() args: FindReportArgs) {
    const query = new FindReportQuery(args);
    return this.queryBus.execute(query);
  }

  @UseGuards(JwtAccessAllGuard)
  @Query(() => PaginatedReportPreviewsResponse)
  async findReportPreviews(
    @Args() args: FindReportPreviewsArgs,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ) {
    const query = new FindReportPreviewsQuery({
      args,
      userId: jwtPayload.id,
    });
    return this.queryBus.execute(query);
  }

  @AuthorIdPath('input.authorId')
  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(JwtAccessAuthGuard, AuthorGuard, RootRoleGuard)
  @Mutation(() => String)
  async createReport(@Args('input') input: CreateReportInput): Promise<string> {
    await this.commandBus.execute(new CreateReportCommand(input));
    return input.id;
  }

  @AuthorIdPath('input.authorId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async commentReport(@Args('input') input: CommentReportInput): Promise<string> {
    await this.commandBus.execute(new CommentReportCommand(input));
    return input.id;
  }
}
