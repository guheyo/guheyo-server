import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { CreateReportInput } from '@lib/domains/report/application/commands/create-report/create-report.input';
import { CreateReportCommand } from '@lib/domains/report/application/commands/create-report/create-report.command';
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
}
