import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { values } from 'lodash';
import { Observable, of } from 'rxjs';

@Injectable()
export class OfferChannelInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const [message]: [Message] = context.getArgByIndex(0);
    const allowedChannels: Record<string, string> = this.configService.get(
      'discord.server.market.wts.channels',
    )!;
    const allowedChannelIds = values(allowedChannels);
    if (!allowedChannelIds.includes(message.channel?.id ?? '')) return of([]);
    return next.handle();
  }
}
