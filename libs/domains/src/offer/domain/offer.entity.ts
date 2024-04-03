import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { totalPrice } from '@lib/shared/prisma/extensions/calculate-total-price.extension';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { Type } from 'class-transformer';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { OfferStatus, UpdateOfferProps } from './offer.types';
import { OfferCreatedEvent } from '../application/events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../application/events/offer-updated/offer-updated.event';
import { BumpOfferInput } from '../application/commands/bump-offer/bump-offer.input';

export class OfferEntity extends AggregateRoot {
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

  status: OfferStatus;

  isHidden: boolean = false;

  pending?: string;

  source: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  sellerId: string;

  @Type(() => UserEntity)
  seller: UserEntity;

  bumps: BumpEntity[];

  reportCount: number;

  reportCommentCount: number;

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
    Object.assign(this, omitBy(props, isUndefined));
    this.totalPrice = totalPrice.compute(this);
    this.apply(new OfferUpdatedEvent(this.id));
  }

  canBump() {
    return validateCooldown(this.bumpedAt);
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
