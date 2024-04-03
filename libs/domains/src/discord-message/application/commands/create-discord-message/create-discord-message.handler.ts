import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDiscordMessageCommand } from './create-discord-message.command';
import { DiscordMessageSavePort } from '../../ports/discord-message.save.port';

@CommandHandler(CreateDiscordMessageCommand)
export class CreateDiscordMessageHandler implements ICommandHandler<CreateDiscordMessageCommand> {
  constructor(
    @Inject('DiscordMessageSavePort')
    private readonly discordMessageSavePort: DiscordMessageSavePort,
  ) {}

  async execute(command: CreateDiscordMessageCommand): Promise<void> {
    // TODO
  }
}
