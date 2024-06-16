import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';

@Injectable()
export class DiscordWebhookParser {
  constructor(private readonly configService: ConfigService) {}

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

  parseAuctionURL({ slug }: { slug: string }) {
    return `${this.configService.get('frontend.host')}/auction/${slug}`;
  }
}
