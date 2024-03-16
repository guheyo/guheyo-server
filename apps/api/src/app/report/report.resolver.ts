import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { CreateReportInput } from '@lib/domains/report/application/commands/create-report/create-report.input';
import { CreateReportCommand } from '@lib/domains/report/application/commands/create-report/create-report.command';
import { ReportResponse } from '@lib/domains/report/application/dtos/report.response';
import { FindReportArgs } from '@lib/domains/report/application/queries/find-report/find-report.args';
import { FindReportQuery } from '@lib/domains/report/application/queries/find-report/find-report.query';
import { PaginatedReportsResponse } from '@lib/domains/report/application/queries/find-reports/paginated-reports.response';
import { FindReportsArgs } from '@lib/domains/report/application/queries/find-reports/find-reports.args';
import { FindReportsQuery } from '@lib/domains/report/application/queries/find-reports/find-reports.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class ReportResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  async createReport(@Args('input') input: CreateReportInput): Promise<string> {
    await this.commandBus.execute(new CreateReportCommand(input));
    return input.id;
  }

  @Query(() => ReportResponse)
  async findReport(@Args() args: FindReportArgs) {
    const query = new FindReportQuery(args);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedReportsResponse)
  async findReports(@Args() args: FindReportsArgs) {
    const query = new FindReportsQuery(args);
    return this.queryBus.execute(query);
  }
}
