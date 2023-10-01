import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMember, Interaction } from 'discord.js';
import { Observable, of } from 'rxjs';

@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const [instanceWithUser]: [Interaction | GuildMember] = context.getArgByIndex(0);
    if (instanceWithUser.user.id !== this.configService.get('discord.bot.owner-id')) return of([]);
    return next.handle();
  }
}
