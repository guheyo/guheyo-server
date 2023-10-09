import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { OfferResponse } from '@lib/domains/offer/application/dtos/offer.response';
import { FindOfferByIdQuery } from '@lib/domains/offer/application/queries/find-offer-by-id/find-offer-by-id.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class OfferResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => OfferResponse, { nullable: true })
  async findOfferById(@Args('id') id: string): Promise<OfferResponse | null> {
    const query = new FindOfferByIdQuery(id);
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
  async deleteOffer(@Args('id') id: string): Promise<string> {
    await this.commandBus.execute(new DeleteOfferCommand(id));
    return id;
  }
}
