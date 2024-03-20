import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { validateBump } from '@lib/shared/deal/validate-bump';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { ReportCommentedEvent } from '@lib/domains/report/application/events/report-commented/report-commented.event';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { UpdateDemandProps } from './demand.types';
import { DemandCreatedEvent } from '../application/events/demand-created/demand-created.event';
import { DemandUpdatedEvent } from '../application/events/demand-updated/demand-updated.event';
import { BumpDemandInput } from '../application/commands/bump-demand/bump-demand.input';
import { DEMAND_OPEN, DEMAND_REPORTED_PREFIX } from './demand.constants';
import { CommentDemandReportInput } from '../application/commands/comment-demand-report/comment-demand-report.input';

export class DemandEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  name: string;

  description: string | null;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  businessFunction: string;

  status: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  buyerId: string;

  buyer: UserEntity;

  source: string;

  bumps: BumpEntity[];

  reports: ReportEntity[];

  constructor(partial: Partial<DemandEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new DemandCreatedEvent(this.id));
  }

  isCompatibleSource(source: string) {
    return this.source === source;
  }

  isAuthorized(buyerId: string) {
    return this.buyerId === buyerId;
  }

  update(props: UpdateDemandProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new DemandUpdatedEvent(this.id));
  }

  canBump() {
    return validateBump(this.bumpedAt);
  }

  bump(input: BumpDemandInput) {
    this.apply(
      new BumpedEvent({
        id: input.id,
        type: 'demand',
        refId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
      }),
    );
    this.bumpedAt = new Date();
    this.price = input.newPrice;
  }

  findUncheckedReportsCount() {
    return this.reports.filter((report) => report.status === DEMAND_OPEN).length;
  }

  checkReports() {
    const uncheckedReportsCount = this.findUncheckedReportsCount();
    if (uncheckedReportsCount) {
      this.status = `${DEMAND_REPORTED_PREFIX}#${uncheckedReportsCount}`;
    } else if (this.status.startsWith(DEMAND_REPORTED_PREFIX)) {
      this.status = DEMAND_OPEN;
    }
  }

  findReport({ reportId }: { reportId: string }) {
    return this.reports.find((report) => report.id === reportId);
  }

  commentReport(input: CommentDemandReportInput) {
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
