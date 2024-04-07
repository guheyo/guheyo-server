import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { ConfigService } from '@nestjs/config';
import { DemandCreatedEvent } from '@lib/domains/demand/application/events/demand-created/demand-created.event';
import { SwapCreatedEvent } from '@lib/domains/swap/application/events/swap-created/swap-created.event';
import { SendDiscordWebhookCommand } from '../commands/send-discord-webhook/send-discord-webhook.command';

@Injectable()
export class DiscordWebhookSagas {
  constructor(private readonly configService: ConfigService) {}

  @Saga()
  offerCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferCreatedEvent),
      filter((event) => event.source === 'mobile' || event.source === 'browser'),
      filter((event) => !!event.slug),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            color: 0xef4444,
            username: event.username,
            avatarURL: event.avatarURL,
            title: `[팝니다] ${event.name} - ${event.price}`,
            url: this.parseUrl({ type: 'offer', slug: event.slug! }),
          }),
      ),
    );

  @Saga()
  demandCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(DemandCreatedEvent),
      filter((event) => event.source === 'mobile' || event.source === 'browser'),
      filter((event) => !!event.slug),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            color: 0x22c55e,
            username: event.username,
            avatarURL: event.avatarURL,
            title: `[삽니다] ${event.name} - ${event.price}`,
            url: this.parseUrl({ type: 'demand', slug: event.slug! }),
          }),
      ),
    );

  @Saga()
  swapCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(SwapCreatedEvent),
      filter((event) => event.source === 'mobile' || event.source === 'browser'),
      filter((event) => !!event.slug),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            color: 0xf97316,
            username: event.username,
            avatarURL: event.avatarURL,
            title: `[교환합니다] ${event.name} ${event.price ? `- 내 추가금 +${event.price}` : ''}`,
            url: this.parseUrl({ type: 'swap', slug: event.slug! }),
          }),
      ),
    );

  parseUrl({ type, slug }: { type: string; slug: string }) {
    return `${this.configService.get('frontend.host')}/${type}/${slug}`;
  }
}
