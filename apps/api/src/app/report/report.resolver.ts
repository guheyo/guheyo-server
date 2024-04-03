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
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
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

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedReportPreviewsResponse)
  async findReportPreviews(
    @Args() args: FindReportPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindReportPreviewsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createReport(
    @Args('input') input: CreateReportInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateReportCommand({ input, user }));
    return input.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => String)
  async commentReport(
    @Args('input') input: CommentReportInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CommentReportCommand({ input, user }));
    return input.id;
  }
}
