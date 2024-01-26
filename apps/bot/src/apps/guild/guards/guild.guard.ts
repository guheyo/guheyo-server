import { DiscordConfigService } from '@app/bot/shared/discord/discord.config.service';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GuildMember, Interaction, Message } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class GuildGuard implements CanActivate {
  @Inject()
  private readonly discordConfigService: DiscordConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [instanceWithGuild]: [Interaction | GuildMember | Message] = context.getArgByIndex(0);
    return this.discordConfigService
      .getDiscordServerIds()
      .includes(instanceWithGuild.guild?.id || '');
  }
}
