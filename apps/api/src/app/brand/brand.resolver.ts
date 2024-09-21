import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
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
import { FindBrandsArgs } from '@lib/domains/brand/application/queries/find-brands/find-brands.args';
import { PaginatedBrandsResponse } from '@lib/domains/brand/application/queries/find-brands/paginated-brands.response';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindBrandArgs } from '@lib/domains/brand/application/queries/find-brand/find-brand.args';
import { FindBrandQuery } from '@lib/domains/brand/application/queries/find-brand/find-brand.query';
import { UnfollowBrandCommand } from '@lib/domains/brand/application/commands/unfollow-brand/unfollow-brand.command';
import { BrandDetailResponse } from '@lib/domains/brand/application/dtos/brand-detail.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class BrandResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedBrandsResponse)
  async findBrands(
    @Args() args: FindBrandsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedBrandsResponse> {
    const query = new FindBrandsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => BrandDetailResponse)
  async findBrand(
    @Args() args: FindBrandArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<BrandDetailResponse> {
    const query = new FindBrandQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => BrandDetailResponse)
  async createBrand(
    @Args('input') input: CreateBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<BrandDetailResponse> {
    const brand = await this.commandBus.execute(new CreateBrandCommand({ input, user }));
    return brand;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => BrandDetailResponse)
  async followBrand(
    @Args('input') input: FollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<BrandDetailResponse> {
    const brand = await this.commandBus.execute(new FollowBrandCommand({ input, user }));
    return brand;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => BrandDetailResponse)
  async unfollowBrand(
    @Args('input') input: UnfollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<BrandDetailResponse> {
    const brand = await this.commandBus.execute(new UnfollowBrandCommand({ input, user }));
    return brand;
  }
}
