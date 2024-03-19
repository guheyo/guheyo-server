import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { validateBump } from '@lib/shared/deal/validate-bump';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { ReportCommentedEvent } from '@lib/domains/report/application/events/report-commented/report-commented.event';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { UpdateOfferProps } from './offer.types';
import { OfferCreatedEvent } from '../application/events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../application/events/offer-updated/offer-updated.event';
import { BumpOfferInput } from '../application/commands/bump-offer/bump-offer.input';
import { CommentOfferReportInput } from '../application/commands/comment-offer-report/comment-offer-report.input';
import { OFFER_REPORTED_PREFIX } from './offer.constants';

export class OfferEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  name: string;

  description: string | null;

  price: number;

  priceCurrency: string;

  businessFunction: string;

  status: string;

  source: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  sellerId: string;

  seller: UserEntity;

  bumps: BumpEntity[];

  reports: ReportEntity[];

  constructor(partial: Partial<OfferEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new OfferCreatedEvent(this.id));
  }

  isCompatibleSource(source: string) {
    return this.source === source;
  }

  isAuthorized(sellerId: string) {
    return this.sellerId === sellerId;
  }

  update(props: UpdateOfferProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new OfferUpdatedEvent(this.id));
  }

  canBump() {
    return validateBump(this.bumpedAt);
  }

  bump(input: BumpOfferInput) {
    this.apply(
      new BumpedEvent({
        id: input.id,
        type: 'offer',
        refId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
      }),
    );
    this.bumpedAt = new Date();
    this.price = input.newPrice;
  }

  findUncheckedReportsCount() {
    return this.reports.filter((report) => report.status === REPORT_OPEN).length;
  }

  checkReports() {
    const uncheckedReportsCount = this.findUncheckedReportsCount();
    if (uncheckedReportsCount) {
      this.status = `${OFFER_REPORTED_PREFIX}#${uncheckedReportsCount}`;
    } else if (this.status.startsWith(OFFER_REPORTED_PREFIX)) {
      this.status = REPORT_OPEN;
    }
  }

  findReport({ reportId }: { reportId: string }) {
    return this.reports.find((report) => report.id === reportId);
  }

  commentReport(input: CommentOfferReportInput) {
    this.apply(
      new ReportCommentedEvent({
        id: input.id,
        reportId: input.reportId,
        authorId: input.authorId,
        content: input.content,
        source: input.source,
      }),
    );
  }
}
