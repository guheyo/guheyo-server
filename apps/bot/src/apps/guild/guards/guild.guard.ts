import { ConfigParser } from '@app/bot/shared/parsers/config.parser';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GuildMember, Interaction, Message } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class GuildGuard implements CanActivate {
  @Inject()
  private readonly configParser: ConfigParser;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [instanceWithGuild]: [Interaction | GuildMember | Message] = context.getArgByIndex(0);
    return this.configParser.getDiscordServerIds().includes(instanceWithGuild.guild?.id || '');
  }
}
