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
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindLastReportQuery } from '@lib/domains/report/application/queries/find-last-report/find-last-report.query';
import { ReportCommentResponse } from '@lib/domains/report/application/dtos/report-comment.response';
import { FindReportCommentArgs } from '@lib/domains/report/application/queries/find-report-comment/find-report-comment.args';
import { FindReportCommentQuery } from '@lib/domains/report/application/queries/find-report-comment/find-report-comment.query';
import { UpdateReportCommentInput } from '@lib/domains/report/application/commands/update-report-comment/update-report-comment.input';
import { UpdateReportCommentCommand } from '@lib/domains/report/application/commands/update-report-comment/update-report-comment.command';
import { LastReportResponse } from '@lib/domains/report/application/dtos/last-report.response';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { UserAgent } from '@lib/domains/auth/decorators/user-agent/user-agent.decorator';
import { IpAddress } from '@lib/domains/auth/decorators/ip/ip-address.decorator';
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

  @UseGuards(RequiredJwtUserGuard)
  @Query(() => LastReportResponse)
  async findLastReport(@ExtractedUser() user: MyUserResponse) {
    const query = new FindLastReportQuery({
      user,
    });
    return this.queryBus.execute(query);
  }

  @Query(() => ReportCommentResponse)
  async findReportComment(@Args() args: FindReportCommentArgs) {
    const query = new FindReportCommentQuery({ args });
    return this.queryBus.execute(query);
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async createReport(
    @Args('input') input: CreateReportInput,
    @ExtractedUser() user: MyUserResponse,
    @UserAgent() userAgent: string,
    @IpAddress() ipAddress: string,
  ): Promise<string> {
    await this.commandBus.execute(new CreateReportCommand({ input, user, userAgent, ipAddress }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [],
    allowlistRoleNames: [],
  })
  @Mutation(() => ReportCommentResponse)
  async commentReport(
    @Args('input') input: CommentReportInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ReportCommentResponse> {
    return this.commandBus.execute(new CommentReportCommand({ input, user }));
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [],
    allowlistRoleNames: [],
  })
  @Mutation(() => ReportCommentResponse)
  async updateReportComment(
    @Args('input') input: UpdateReportCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ReportCommentResponse> {
    return this.commandBus.execute(new UpdateReportCommentCommand({ input, user }));
  }
}
