import { DiscordConfigService } from '@app/bot/shared/discord/discord.config.service';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GuildMember, Interaction } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {
  @Inject()
  private readonly discordConfigService: DiscordConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [instanceWithUser]: [Interaction | GuildMember] = context.getArgByIndex(0);
    return instanceWithUser.user.id === this.discordConfigService.getDiscordBotOwnerId();
  }
}
