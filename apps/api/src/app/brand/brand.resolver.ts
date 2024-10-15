import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HttpStatus, UseGuards } from '@nestjs/common';
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
import { UpsertBrandsFromCsvInput } from '@lib/domains/brand/application/commands/upsert-brands-from-csv/upsert-brands-from-csv.input';
import { UpsertBrandsFromCsvCommand } from '@lib/domains/brand/application/commands/upsert-brands-from-csv/upsert-brands-from-csv.command';
import { ADMIN_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { BrandPreviewResponse } from '@lib/domains/brand/application/dtos/brand-preview.response';
import { FindBrandPreviewArgs } from '@lib/domains/brand/application/queries/find-brand-preview/find-brand-preview.args';
import { FindBrandPreviewQuery } from '@lib/domains/brand/application/queries/find-brand-preview/find-brand-preview.query';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class BrandResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
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

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => BrandPreviewResponse)
  async findBrandPreview(
    @Args() args: FindBrandPreviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<BrandPreviewResponse> {
    const query = new FindBrandPreviewQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
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
  @Mutation(() => MutationResponse)
  async createBrand(
    @Args('input') input: CreateBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateBrandCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => MutationResponse)
  async followBrand(
    @Args('input') input: FollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new FollowBrandCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.brandId,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => MutationResponse)
  async unfollowBrand(
    @Args('input') input: UnfollowBrandInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new UnfollowBrandCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.brandId,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [ADMIN_ROLE_NAME],
  })
  @Mutation(() => MutationResponse)
  async upsertBrandsFromCsv(
    @Args('input') input: UpsertBrandsFromCsvInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new UpsertBrandsFromCsvCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.filePath,
    };
  }
}
