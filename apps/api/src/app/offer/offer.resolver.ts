import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { OfferResponse } from '@lib/domains/offer/application/dtos/offer.response';
import { FindOfferQuery } from '@lib/domains/offer/application/queries/find-offer/find-offer.query';
import { FindOfferPreviewsArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offer-previews.args';
import { FindOfferPreviewsQuery } from '@lib/domains/offer/application/queries/find-offer-previews/find-offer-previews.query';
import { PaginatedOfferPreviewsResponse } from '@lib/domains/offer/application/queries/find-offer-previews/paginated-offer-previews.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FindOfferArgs } from '@lib/domains/offer/application/queries/find-offer/find-offer.args';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { BumpOfferInput } from '@lib/domains/offer/application/commands/bump-offer/bump-offer.input';
import { BumpOfferCommand } from '@lib/domains/offer/application/commands/bump-offer/bump-offer.command';
import { OfferPreviewResponse } from '@lib/domains/offer/application/dtos/offer-preview.response';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { FindOfferCountArgs } from '@lib/domains/offer/application/queries/find-offer-count/find-offer-count.args';
import { FindOfferCountQuery } from '@lib/domains/offer/application/queries/find-offer-count/find-offer-count.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class OfferResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => OfferResponse, { nullable: true })
  async findOffer(
    @Args() findOfferArgs: FindOfferArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<OfferResponse | null> {
    const query = new FindOfferQuery({
      args: findOfferArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedOfferPreviewsResponse)
  async findOfferPreviews(
    @Args() findOfferPreviewsArgs: FindOfferPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindOfferPreviewsQuery({
      args: findOfferPreviewsArgs,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @Query(() => Number)
  async findOfferCount(@Args() args: FindOfferCountArgs) {
    const query = new FindOfferCountQuery({ args });
    return this.queryBus.execute(query);
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createOffer(
    @Args('input') input: CreateOfferInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateOfferCommand({ input, user }));
    return input.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => OfferPreviewResponse)
  async updateOffer(
    @Args('input') input: UpdateOfferInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<OfferPreviewResponse> {
    return this.commandBus.execute(new UpdateOfferCommand({ input, user }));
  }

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async deleteOffer(
    @Args() args: DeleteOfferArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteOfferCommand({ args, user }));
    return args.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => OfferPreviewResponse)
  async bumpOffer(
    @Args('input') input: BumpOfferInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<OfferPreviewResponse> {
    return this.commandBus.execute(new BumpOfferCommand({ input, user }));
  }
}
