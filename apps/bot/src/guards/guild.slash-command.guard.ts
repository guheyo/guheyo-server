import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interaction } from 'discord.js';

@Injectable()
export class GuildSlashCommandGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const [interaction]: [Interaction] = context.getArgByIndex(0);
    return interaction.guildId === this.configService.get('discord.base-guild.id');
  }
}
