import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { CreateGuildCommand } from './create-guild.command';
import { GuildSavePort } from '../../ports/out/guild.save.port';

@CommandHandler(CreateGuildCommand)
export class CreateGuildHandler implements ICommandHandler<CreateGuildCommand> {
  constructor(@Inject('GuildSavePort') private savePort: GuildSavePort) {}

  async execute(command: CreateGuildCommand): Promise<void> {
    const guild = new GuildEntity(command);
    await this.savePort.create(guild);
  }
}
