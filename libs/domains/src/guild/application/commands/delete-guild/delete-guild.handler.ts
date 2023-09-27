import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { GuildErrorMessage } from '@lib/domains/guild/domain/guild.error.message';
import { DeleteGuildCommand } from './delete-guild.command';
import { GuildLoadPort } from '../../ports/out/guild.load.port';
import { GuildSavePort } from '../../ports/out/guild.save.port';

@CommandHandler(DeleteGuildCommand)
export class DeleteGuildHandler implements ICommandHandler<DeleteGuildCommand> {
  constructor(
    @Inject('GuildLoadPort') private guildLoadPort: GuildLoadPort,
    @Inject('GuildSavePort') private guildSavePort: GuildSavePort,
  ) {}

  async execute(command: DeleteGuildCommand): Promise<void> {
    const guild = await this.guildLoadPort.findById(command.id);
    if (!guild) throw new NotFoundException(GuildErrorMessage.GUILD_IS_NOT_FOUND);

    await this.guildSavePort.delete(guild);
  }
}
