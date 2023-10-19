import { CreateDiscordMessageCommand } from '@lib/domains/discord-message/application/commands/create-discord-message/create-discord-message.command';
import { CreateDiscordMessageInput } from '@lib/domains/discord-message/application/commands/create-discord-message/create-discord-message.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class DiscordMessageResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  async createDiscordMessage(@Args('input') input: CreateDiscordMessageInput): Promise<string> {
    await this.commandBus.execute(new CreateDiscordMessageCommand(input));
    return input.modelId;
  }
}
