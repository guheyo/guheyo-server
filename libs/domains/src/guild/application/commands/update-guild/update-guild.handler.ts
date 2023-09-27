import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { GuildErrorMessage } from '@lib/domains/guild/domain/guild.error.message';
import { UpdateGuildCommand } from './update-guild.command';
import { GuildLoadPort } from '../../ports/out/guild.load.port';
import { GuildSavePort } from '../../ports/out/guild.save.port';

@CommandHandler(UpdateGuildCommand)
export class UpdateGuildHandler implements ICommandHandler<UpdateGuildCommand> {
  constructor(
    @Inject('GuildSavePort') private guildSavePort: GuildSavePort,
    @Inject('GuildLoadPort') private guildLoadPort: GuildLoadPort,
  ) {}

  async execute(command: UpdateGuildCommand): Promise<void> {
    const guild = await this.guildLoadPort.findById(command.id);
    if (!guild) throw new NotFoundException(GuildErrorMessage.GUILD_IS_NOT_FOUND);

    guild.update(command);
    await this.guildSavePort.save(guild);
  }
}
