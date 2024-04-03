import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { isUndefined, omitBy } from 'lodash';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { totalPrice } from '@lib/shared/prisma/extensions/calculate-total-price.extension';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { DemandStatus, UpdateDemandProps } from './demand.types';
import { DemandCreatedEvent } from '../application/events/demand-created/demand-created.event';
import { DemandUpdatedEvent } from '../application/events/demand-updated/demand-updated.event';
import { BumpDemandInput } from '../application/commands/bump-demand/bump-demand.input';

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

  totalPrice: number;

  businessFunction: string;

  status: DemandStatus;

  isHidden: boolean = false;

  pending?: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  buyerId: string;

  buyer: UserEntity;

  source: string;

  bumps: BumpEntity[];

  reportCount: number;

  reportCommentCount: number;

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
    Object.assign(this, omitBy(props, isUndefined));
    this.totalPrice = totalPrice.compute(this);
    this.apply(new DemandUpdatedEvent(this.id));
  }

  canBump() {
    return validateCooldown(this.bumpedAt);
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

  checkReports(reportStatus: string) {
    if (reportStatus === REPORT_OPEN) {
      this.reportCount += 1;
    } else if (reportStatus === REPORT_COMMENTED) {
      this.reportCommentCount += 1;
    }
  }

  hasUncommentedReports() {
    return this.reportCount - this.reportCommentCount > 0;
  }
}
