import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { VersionResponse } from '@lib/domains/version/application/dtos/version.response';
import { FindVersionArgs } from '@lib/domains/version/application/queries/find-version/find-version.args';
import { FindVersionQuery } from '@lib/domains/version/application/queries/find-version/find-version.query';
import { VersionPreviewResponse } from '@lib/domains/version/application/dtos/version-preview.response';
import { FindVersionPreviewQuery } from '@lib/domains/version/application/queries/find-version-preview/find-version-preview.query';
import { FindVersionPreviewArgs } from '@lib/domains/version/application/queries/find-version-preview/find-version-preview.args';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class VersionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => VersionPreviewResponse, { nullable: true })
  async findVersionPreview(@Args() args: FindVersionPreviewArgs) {
    const query = new FindVersionPreviewQuery(args);
    return this.queryBus.execute(query);
  }

  @Query(() => VersionResponse, { nullable: true })
  async findVersion(@Args() args: FindVersionArgs) {
    const query = new FindVersionQuery(args);
    return this.queryBus.execute(query);
  }
}
