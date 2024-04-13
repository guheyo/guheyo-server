import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { ConfigService } from '@nestjs/config';
import { SendDiscordWebhookCommand } from '../commands/send-discord-webhook/send-discord-webhook.command';

@Injectable()
export class DiscordWebhookSagas {
  constructor(private readonly configService: ConfigService) {}

  @Saga()
  offerCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferCreatedEvent),
      filter((event) => event.userAgent !== 'discord'),
      filter((event) => !!event.slug),
      filter((event) => ['offer', 'demand', 'swap'].includes(event.businessFunction)),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            color: this.parseColor(event.businessFunction),
            username: event.username,
            avatarURL: event.avatarURL,
            title: this.parseTitle({
              businessFunction: event.businessFunction,
              title: event.title,
              price: event.price,
            }),
            url: this.parseUrl({ businessFunction: event.businessFunction, slug: event.slug! }),
          }),
      ),
    );

  parseColor(businessFunction: string) {
    if (businessFunction === 'offer') return 0xef4444;
    if (businessFunction === 'demand') return 0x22c55e;
    // SWAP
    return 0xf97316;
  }

  parseTitle({
    businessFunction,
    title,
    price,
  }: {
    businessFunction: string;
    title: string;
    price: number;
  }) {
    if (businessFunction === 'offer') return `[삽니다] ${title} - ${price}`;
    if (businessFunction === 'demand') return `[삽니다] ${title} - ${price}`;
    return `[교환합니다] ${title} ${price ? `- 내 추가금 +${price}` : ''}`;
  }

  parseUrl({ businessFunction, slug }: { businessFunction: string; slug: string }) {
    return `${this.configService.get('frontend.host')}/${businessFunction}/${slug}`;
  }
}
