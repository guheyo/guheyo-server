import { Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { BrandResponse } from '@lib/domains/brand/application/dtos/brand.response';
import { FindBrandsQuery } from '@lib/domains/brand/application/queries/find-brands/find-brands.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class BrandResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [BrandResponse])
  async findBrands(): Promise<BrandResponse[]> {
    const query = new FindBrandsQuery();
    return this.queryBus.execute(query);
  }
}
