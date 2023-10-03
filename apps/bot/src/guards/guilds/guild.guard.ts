import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMember, Interaction, Message } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class GuildGuard implements CanActivate {
  @Inject()
  private readonly configService: ConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [instanceWithGuild]: [Interaction | GuildMember | Message] = context.getArgByIndex(0);
    return instanceWithGuild.guild?.id === this.configService.get('discord.server.id');
  }
}
