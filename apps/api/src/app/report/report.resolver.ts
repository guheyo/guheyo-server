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
import { MemberRoleGuard } from '@lib/domains/auth/guards/naver/member-role.guard';
import { GroupSlug } from '@lib/domains/auth/decorators/group-slug/group-slug.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { ROOT_GROUP_SLUG } from '@lib/domains/group/domain/group.constants';
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

  @Query(() => PaginatedReportPreviewsResponse)
  async findReportPreviews(@Args() args: FindReportPreviewsArgs) {
    const query = new FindReportPreviewsQuery(args);
    return this.queryBus.execute(query);
  }

  @GroupSlug(ROOT_GROUP_SLUG)
  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @AuthorIdPath('input.authorId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard, MemberRoleGuard)
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
