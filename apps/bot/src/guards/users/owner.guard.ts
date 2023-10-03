import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMember, Interaction } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {
  @Inject()
  private readonly configService: ConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [instanceWithUser]: [Interaction | GuildMember] = context.getArgByIndex(0);
    return instanceWithUser.user.id === this.configService.get('discord.bot.owner-id');
  }
}
