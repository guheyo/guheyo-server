import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { OFFER_BUSINESS_FUNCTIONS } from '@lib/domains/offer/domain/offer.types';
import { includes } from 'lodash';
import { ReportCreatedEvent } from '@lib/domains/report/application/events/report-created/report-created.event';
import { UserReviewCreatedEvent } from '@lib/domains/user-review/application/events/user-review-created/user-review-created.event';
import { SendDiscordWebhookCommand } from '../commands/send-discord-webhook/send-discord-webhook.command';
import { DiscordWebhookParser } from '../services/discord-webhook.parser';

@Injectable()
export class DiscordWebhookSagas {
  constructor(private readonly discordWebhookParser: DiscordWebhookParser) {}

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
            color: this.discordWebhookParser.parseOfferColor(event.businessFunction),
            username: event.username,
            avatarURL: event.avatarURL,
            title: this.discordWebhookParser.parseOfferTitle({
              businessFunction: event.businessFunction,
              title: event.title,
              price: event.price,
            }),
            url: this.discordWebhookParser.parseOfferURL({ slug: event.slug! }),
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
            url: this.discordWebhookParser.parseReportURL({ reportId: event.reportId }),
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
            color: this.discordWebhookParser.parseUserReviewColor(event.rating),
            username: event.username,
            avatarURL: event.userAvatarURL,
            title: this.discordWebhookParser.parseUserReviewTitle({
              rating: event.rating,
              title: event.title,
            }),
            url: this.discordWebhookParser.parseUserReviewURL({ slug: event.slug! }),
          }),
      ),
    );
}
