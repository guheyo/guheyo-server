import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { ConfigService } from '@nestjs/config';
import { OFFER_BUSINESS_FUNCTIONS } from '@lib/domains/offer/domain/offer.types';
import { includes } from 'lodash';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';
import { ReportCreatedEvent } from '@lib/domains/report/application/events/report-created/report-created.event';
import { UserReviewCreatedEvent } from '@lib/domains/user-review/application/events/user-review-created/user-review-created.event';
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
      filter((event) => includes(OFFER_BUSINESS_FUNCTIONS, event.businessFunction)),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            target: 'offer',
            color: this.parseOfferColor(event.businessFunction),
            username: event.username,
            avatarURL: event.avatarURL,
            title: this.parseOfferTitle({
              businessFunction: event.businessFunction,
              title: event.title,
              price: event.price,
            }),
            url: this.parseOfferURL({ slug: event.slug! }),
          }),
      ),
    );

  @Saga()
  reportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            target: 'report',
            color: 'Red',
            username: event.reportedUserUsername,
            avatarURL: event.reportedUserAvatarURL,
            title: event.reason,
            url: this.parseReportURL({ reportId: event.reportId }),
          }),
      ),
    );

  @Saga()
  userReviewCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserReviewCreatedEvent),
      map(
        (event) =>
          new SendDiscordWebhookCommand({
            target: 'userReview',
            color: this.parseUserReviewColor(event.rating),
            username: event.username,
            avatarURL: event.userAvatarURL,
            title: this.parseUserReviewTitle({ rating: event.rating, title: event.title }),
            url: this.parseUserReviewURL({ slug: event.slug! }),
          }),
      ),
    );

  parseOfferColor(businessFunction: string) {
    if (businessFunction === 'sell') return 'Blue';
    if (businessFunction === 'buy') return 'DarkGreen';
    // SWAP
    return 'Orange';
  }

  parseUserReviewColor(rating: number) {
    if (rating === 1) return 'Red';
    return 'DarkGreen';
  }

  parseOfferTitle({
    businessFunction,
    title,
    price,
  }: {
    businessFunction: string;
    title: string;
    price: number;
  }) {
    if (businessFunction === 'sell') return `[삽니다] ${title} - ${price}`;
    if (businessFunction === 'buy') return `[삽니다] ${title} - ${price}`;
    // swap
    return `[교환합니다] ${title} ${price ? `- 내 추가금 +${price}` : ''}`;
  }

  parseUserReviewTitle({ rating, title }: { rating: number; title: string }) {
    if (rating === 1) return `[비매너 후기] ${title}`;
    return `[매너 후기] ${title}`;
  }

  parseOfferURL({ slug }: { slug: string }) {
    return `${this.configService.get('frontend.host')}/${OFFER}/${slug}`;
  }

  parseReportURL({ reportId }: { reportId: string }) {
    return `${this.configService.get('frontend.host')}/report/${reportId}`;
  }

  parseUserReviewURL({ slug }: { slug: string }) {
    return `${this.configService.get('frontend.host')}/review/${slug}`;
  }
}
