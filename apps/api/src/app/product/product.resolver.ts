import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { FindProductsQuery } from '@lib/domains/product/application/queries/find-products/find-products.query';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import {
  ROOT_ADMIN_ROLE_NAMES,
  ROOT_BLOCKLIST_ROLE_NAMES,
} from '@lib/domains/role/domain/role.types';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateProductCommand } from '@lib/domains/product/application/commands/create-product/create-product.command';
import { CreateProductInput } from '@lib/domains/product/application/commands/create-product/create-product.input';
import { FindProductsArgs } from '@lib/domains/product/application/queries/find-products/find-products.args';
import { PaginatedProductsResponse } from '@lib/domains/product/application/queries/find-products/paginated-products.response';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindProductArgs } from '@lib/domains/product/application/queries/find-product/find-product.args';
import { FindProductQuery } from '@lib/domains/product/application/queries/find-product/find-product.query';
import { ProductDetailResponse } from '@lib/domains/product/application/dtos/product-detail.response';
import { ProductPreviewResponse } from '@lib/domains/product/application/dtos/product-preview.response';
import { FindProductPreviewArgs } from '@lib/domains/product/application/queries/find-product-preview/find-product-preview.args';
import { FindProductPreviewQuery } from '@lib/domains/product/application/queries/find-product-preview/find-product-preview.query';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class ProductResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedProductsResponse)
  async findProducts(
    @Args() args: FindProductsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedProductsResponse> {
    const query = new FindProductsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => ProductPreviewResponse)
  async findProductPreview(
    @Args() args: FindProductPreviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ProductPreviewResponse> {
    const query = new FindProductPreviewQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => ProductDetailResponse)
  async findProduct(
    @Args() args: FindProductArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ProductDetailResponse> {
    const query = new FindProductQuery({
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
  async createProduct(
    @Args('input') input: CreateProductInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateProductCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }
}
