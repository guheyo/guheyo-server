import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { OfferResponse } from '@lib/domains/offer/application/dtos/offer.response';
import { FindOfferByIdQuery } from '@lib/domains/offer/application/queries/find-offer-by-id/find-offer-by-id.query';
import { FindOfferQuery } from '@lib/domains/offer/application/queries/find-offer/find-offer.query';
import { FindOffersArgs } from '@lib/domains/offer/application/queries/find-offers/find-offers.args';
import { FindOffersQuery } from '@lib/domains/offer/application/queries/find-offers/find-offers.query';
import { PaginatedOffersResponse } from '@lib/domains/offer/application/queries/find-offers/paginated-offers.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class OfferResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => OfferResponse, { nullable: true })
  async findOfferById(@Args('id', { type: () => ID }) id: string): Promise<OfferResponse | null> {
    const query = new FindOfferByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => OfferResponse, { nullable: true })
  async findOffer(@Args('slug') slug: string): Promise<OfferResponse | null> {
    const query = new FindOfferQuery(slug);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedOffersResponse)
  async findOffers(@Args() findOffersArgs: FindOffersArgs) {
    const query = new FindOffersQuery(findOffersArgs);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createOffer(@Args('input') input: CreateOfferInput): Promise<string> {
    await this.commandBus.execute(new CreateOfferCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateOffer(@Args('input') input: UpdateOfferInput): Promise<string> {
    await this.commandBus.execute(new UpdateOfferCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteOffer(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteOfferCommand(id));
    return id;
  }
}
