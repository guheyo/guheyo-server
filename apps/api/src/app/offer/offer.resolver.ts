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
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { AuthorIdPath } from '@lib/domains/auth/decorators/author-id-path/author-id-path.decorator';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { BumpOfferInput } from '@lib/domains/offer/application/commands/bump-offer/bump-offer.input';
import { BumpOfferCommand } from '@lib/domains/offer/application/commands/bump-offer/bump-offer.command';
import { OfferPreviewResponse } from '@lib/domains/offer/application/dtos/offer-preview.response';
import { ExtractedJwtPayload } from '@lib/domains/auth/decorators/extracted-jwt-payload/extracted-jwt-payload.decorator';
import { JwtAccessAllGuard } from '@lib/domains/auth/guards/jwt/jwt-access-all.guard';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class OfferResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAccessAllGuard)
  @Query(() => OfferResponse, { nullable: true })
  async findOffer(
    @Args() findOfferArgs: FindOfferArgs,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ): Promise<OfferResponse | null> {
    const query = new FindOfferQuery({
      args: findOfferArgs,
      userId: jwtPayload.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(JwtAccessAllGuard)
  @Query(() => PaginatedOfferPreviewsResponse)
  async findOfferPreviews(
    @Args() findOfferPreviewsArgs: FindOfferPreviewsArgs,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ) {
    const query = new FindOfferPreviewsQuery({
      args: findOfferPreviewsArgs,
      userId: jwtPayload.id,
    });
    return this.queryBus.execute(query);
  }

  @AuthorIdPath('input.sellerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async createOffer(@Args('input') input: CreateOfferInput): Promise<string> {
    await this.commandBus.execute(new CreateOfferCommand(input));
    return input.id;
  }

  @AuthorIdPath('input.sellerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => OfferPreviewResponse)
  async updateOffer(@Args('input') input: UpdateOfferInput): Promise<OfferPreviewResponse> {
    return this.commandBus.execute(new UpdateOfferCommand(input));
  }

  @AuthorIdPath('sellerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => String)
  async deleteOffer(@Args() args: DeleteOfferArgs): Promise<string> {
    await this.commandBus.execute(new DeleteOfferCommand(args));
    return args.id;
  }

  @AuthorIdPath('input.sellerId')
  @UseGuards(JwtAccessAuthGuard, AuthorGuard)
  @Mutation(() => OfferPreviewResponse)
  async bumpOffer(@Args('input') input: BumpOfferInput): Promise<OfferPreviewResponse> {
    return this.commandBus.execute(new BumpOfferCommand(input));
  }
}
