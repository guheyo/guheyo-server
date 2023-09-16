import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interaction } from 'discord.js';

@Injectable()
export class OwnerSlashCommandGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const [interaction]: [Interaction] = context.getArgByIndex(0);
    return interaction.user.id === this.configService.get('discord.bot.owner-id');
  }
}
