import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { ConfigService } from '@nestjs/config';
import { DemandCreatedEvent } from '@lib/domains/demand/application/events/demand-created/demand-created.event';
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
            color: 0xc43176,
            username: event.username,
            avatarURL: event.avatarURL,
            title: `[팝니다] ${event.name} - ${event.price}`,
            url: this.parseUrl({ username: event.username, type: 'offer', slug: event.slug! }),
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
            color: 0x16a34a,
            username: event.username,
            avatarURL: event.avatarURL,
            title: `[삽니다] ${event.name} - ${event.price}`,
            url: this.parseUrl({ username: event.username, type: 'offer', slug: event.slug! }),
          }),
      ),
    );

  parseUrl({ username, type, slug }: { username: string; type: string; slug: string }) {
    return `${this.configService.get('frontend.host')}/user/${username}/${type}/${slug}`;
  }
}
