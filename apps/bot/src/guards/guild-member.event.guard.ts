import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMember } from 'discord.js';

@Injectable()
export class GuildMemberEventGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const [member]: [GuildMember] = context.getArgByIndex(0);
    return member.guild.id === this.configService.get('discord.server.id');
  }
}
