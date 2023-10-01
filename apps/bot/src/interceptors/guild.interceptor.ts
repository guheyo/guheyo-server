import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMember, Interaction, Message } from 'discord.js';
import { Observable, of } from 'rxjs';

@Injectable()
export class GuildInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const [instanceWithGuild]: [Interaction | GuildMember | Message] = context.getArgByIndex(0);
    if (instanceWithGuild.guild?.id !== this.configService.get('discord.server.id')) return of([]);
    return next.handle();
  }
}
