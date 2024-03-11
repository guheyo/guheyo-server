import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { validateBump } from '@lib/shared/deal/validate-bump';
import { UpdateSwapProps } from './swap.types';
import { SwapCreatedEvent } from '../application/events/swap-created/swap-created.event';
import { SwapUpdatedEvent } from '../application/events/swap-updated/swap-updated.event';
import { BumpSwapInput } from '../application/commands/bump-swap/bump-swap.input';
import { SwapBumpedEvent } from '../application/events/swap-bumped/swap-bumped.event';

export class SwapEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  price: number;

  priceCurrency: string;

  name0: string;

  name1: string;

  description0: string | null;

  description1: string | null;

  businessFunction: string;

  status: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  proposerId: string;

  proposer: UserEntity;

  source: string;

  constructor(partial: Partial<SwapEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new SwapCreatedEvent(this.id));
  }

  isCompatibleSource(source: string) {
    return this.source === source;
  }

  isAuthorized(proposerId: string) {
    return this.proposerId === proposerId;
  }

  update(props: UpdateSwapProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new SwapUpdatedEvent(this.id));
  }

  canBump() {
    return validateBump(this.bumpedAt);
  }

  bump(input: BumpSwapInput) {
    this.apply(
      new SwapBumpedEvent({
        id: input.id,
        swapId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
      }),
    );
    this.bumpedAt = new Date();
    this.price = input.newPrice;
  }
}
