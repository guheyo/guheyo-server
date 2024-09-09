import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { BrandResponse } from '@lib/domains/brand/application/dtos/brand.response';
import { FindBrandsQuery } from '@lib/domains/brand/application/queries/find-brands/find-brands.query';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import {
  ROOT_ADMIN_ROLE_NAMES,
  ROOT_BLOCKLIST_ROLE_NAMES,
} from '@lib/domains/role/domain/role.types';
import { FollowBrandInput } from '@lib/domains/brand/application/commands/follow-brand/follow-brand.input';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FollowBrandCommand } from '@lib/domains/brand/application/commands/follow-brand/follow-brand.command';
import { UnfollowBrandInput } from '@lib/domains/brand/application/commands/unfollow-brand/unfollow-brand.input';
import { CreateBrandCommand } from '@lib/domains/brand/application/commands/create-brand/create-brand.command';
import { CreateBrandInput } from '@lib/domains/brand/application/commands/create-brand/create-brand.input';
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

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => BrandResponse)
  async createBrand(
    @Args('input') input: CreateBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    const brand = await this.commandBus.execute(new CreateBrandCommand({ input, user }));
    return brand;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => BrandResponse)
  async followBrand(
    @Args('input') input: FollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    const brand = await this.commandBus.execute(new FollowBrandCommand({ input, user }));
    return brand;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => BrandResponse)
  async unfollowBrand(
    @Args('input') input: UnfollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    const brand = await this.commandBus.execute(new FollowBrandCommand({ input, user }));
    return brand;
  }
}
