import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { OfferCreatedEvent } from '@lib/domains/offer/application/events/offer-created/offer-created.event';
import { OFFER_BUSINESS_FUNCTIONS } from '@lib/domains/offer/domain/offer.types';
import { includes } from 'lodash';
import { ReportCreatedEvent } from '@lib/domains/report/application/events/report-created/report-created.event';
import { UserReviewCreatedEvent } from '@lib/domains/user-review/application/events/user-review-created/user-review-created.event';
import { AuctionCreatedEvent } from '@lib/domains/auction/application/events/auction-created/auction-created.event';
import { EmbedBuilder } from 'discord.js';
import dayjs from 'dayjs';
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
      map((event) => {
        const embed = new EmbedBuilder()
          .setTitle(
            this.discordWebhookParser.parseOfferTitle({
              businessFunction: event.businessFunction,
              title: event.title,
              price: event.price,
            }),
          )
          .setColor(this.discordWebhookParser.parseOfferColor(event.businessFunction))
          .setAuthor({
            name: event.username,
            iconURL: event.avatarURL,
          })
          .setDescription(this.discordWebhookParser.parseOfferURL({ slug: event.slug! }));
        return new SendDiscordWebhookCommand({
          target: 'offer',
          embed,
        });
      }),
    );

  @Saga()
  auctionCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionCreatedEvent),
      filter((event) => event.userAgent !== 'discord'),
      filter((event) => !!event.slug),
      map((event) => {
        const unixTimestamp = Math.floor(event.extendedEndDate.getTime() / 1000);
        const embed = new EmbedBuilder()
          .setAuthor({
            name: event.username,
            iconURL: event.avatarURL || undefined,
          })
          .setColor('DarkGreen')
          .setTitle(`${event.title}\n${process.env.FRONTEND_HOST}/auction/${event.slug}`)
          .setDescription(
            `경매 시작: ${dayjs(event.createdAt).format('YYYY-MM-DD HH:mm')}\n경매 종료: ${dayjs(
              event.extendedEndDate,
            ).format('YYYY-MM-DD HH:mm')}\n${`<t:${unixTimestamp}:R> 종료`}`,
          )
          .setFooter({
            text: `입찰가: 0`,
          });
        return new SendDiscordWebhookCommand({
          target: 'auction',
          embed,
        });
      }),
    );

  @Saga()
  reportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      map((event) => {
        const embed = new EmbedBuilder()
          .setTitle(event.reason)
          .setColor('Red')
          .setAuthor({
            name: event.reportedUserUsername,
            iconURL: event.reportedUserAvatarURL,
          })
          .setDescription(this.discordWebhookParser.parseReportURL({ reportId: event.reportId }));
        return new SendDiscordWebhookCommand({
          target: 'report',
          embed,
        });
      }),
    );

  @Saga()
  userReviewCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserReviewCreatedEvent),
      map((event) => {
        const embed = new EmbedBuilder()
          .setTitle(
            this.discordWebhookParser.parseUserReviewTitle({
              rating: event.rating,
              title: event.title,
            }),
          )
          .setColor(this.discordWebhookParser.parseUserReviewColor(event.rating))
          .setAuthor({
            name: event.username,
            iconURL: event.userAvatarURL,
          })
          .setDescription(this.discordWebhookParser.parseUserReviewURL({ slug: event.slug! }));
        return new SendDiscordWebhookCommand({
          target: 'userReview',
          embed,
        });
      }),
    );
}
