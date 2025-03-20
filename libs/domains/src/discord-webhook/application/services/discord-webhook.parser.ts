import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';
import { formatNumber } from '@lib/shared/number/format-number';
import { truncateText } from '@lib/shared/text/truncate-text';

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
    if (businessFunction === 'sell') return `[판매] ${title} - ${formatNumber(price)}원`;
    if (businessFunction === 'buy') return `[구매] ${title} - ${formatNumber(price)}원`;
    // swap
    return `[교환] ${title} ${price ? `\n내 추가금 +${formatNumber(price)}원` : ''}`;
  }

  parseUserReviewTitle({ rating, title }: { rating: number; title: string }) {
    if (rating === 1) return `[비매너 후기] ${title}`;
    return `[매너 후기] ${title}`;
  }

  parseCreatedReportCommentTitle({ content }: { content: string }) {
    return `[New] ${truncateText(content, 40)}`;
  }

  parseUpdatedReportCommentTitle({
    oldContent,
    newContent,
  }: {
    oldContent: string;
    newContent: string;
  }) {
    return `[New] ${truncateText(newContent, 40)}\n[Old] ${truncateText(oldContent, 40)}`;
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
