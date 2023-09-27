import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { FindGuildByIdQuery } from '@lib/domains/guild/application/queries/find-guild-by-id/find-guild-by-id.query';
import { CreateGuildInput } from '@lib/domains/guild/application/commands/create-guild/create-guild.input';
import { CreateGuildCommand } from '@lib/domains/guild/application/commands/create-guild/create-guild.command';
import { UpdateGuildInput } from '@lib/domains/guild/application/commands/update-guild/update-guild.input';
import { UpdateGuildCommand } from '@lib/domains/guild/application/commands/update-guild/update-guild.command';
import { DeleteGuildCommand } from '@lib/domains/guild/application/commands/delete-guild/delete-guild.command';

@Resolver()
export class GuildResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => GuildResponse, { nullable: true })
  async findGuildById(@Args('id') id: string): Promise<GuildResponse | null> {
    const query = new FindGuildByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createGuild(@Args('input') input: CreateGuildInput): Promise<String> {
    await this.commandBus.execute(new CreateGuildCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateGuild(@Args('input') input: UpdateGuildInput): Promise<String> {
    await this.commandBus.execute(new UpdateGuildCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteGuild(@Args('id') id: string): Promise<String> {
    await this.commandBus.execute(new DeleteGuildCommand(id));
    return id;
  }
}