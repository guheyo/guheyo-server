import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { isUndefined, omitBy } from 'lodash';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { totalPrice } from '@lib/shared/prisma/extensions/calculate-total-price.extension';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { UpdateSwapProps } from './swap.types';
import { SwapCreatedEvent } from '../application/events/swap-created/swap-created.event';
import { SwapUpdatedEvent } from '../application/events/swap-updated/swap-updated.event';
import { BumpSwapInput } from '../application/commands/bump-swap/bump-swap.input';

export class SwapEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  totalPrice: number;

  name0: string;

  name1: string;

  slug: string | null;

  description0: string | null;

  description1: string | null;

  businessFunction: string;

  status: string;

  isHidden: boolean = false;

  pending?: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  proposerId: string;

  proposer: UserEntity;

  source: string;

  bumps: BumpEntity[];

  reportCount: number;

  reportCommentCount: number;

  constructor(partial: Partial<SwapEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(
      new SwapCreatedEvent({
        id: this.id,
        username: this.proposer.username,
        avatarURL: this.proposer.avatarURL || undefined,
        name: `${this.name0} <-> ${this.name1}`,
        slug: this.slug || undefined,
        price: this.price,
        source: this.source,
      }),
    );
  }

  isCompatibleSource(source: string) {
    return this.source === source;
  }

  isAuthorized(proposerId: string) {
    return this.proposerId === proposerId;
  }

  update(props: UpdateSwapProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.totalPrice = totalPrice.compute(this);
    this.apply(new SwapUpdatedEvent(this.id));
  }

  canBump() {
    return validateCooldown(this.bumpedAt);
  }

  bump(input: BumpSwapInput) {
    this.apply(
      new BumpedEvent({
        id: input.id,
        type: 'swap',
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
