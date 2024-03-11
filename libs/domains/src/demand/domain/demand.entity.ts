import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { validateBump } from '@lib/shared/deal/validate-bump';
import { UpdateDemandProps } from './demand.types';
import { DemandCreatedEvent } from '../application/events/demand-created/demand-created.event';
import { DemandUpdatedEvent } from '../application/events/demand-updated/demand-updated.event';
import { BumpDemandInput } from '../application/commands/bump-demand/bump-demand.input';
import { DemandBumpedEvent } from '../application/events/demand-bumped/demand-bumped.event';

export class DemandEntity extends AggregateRoot {
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

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  buyerId: string;

  buyer: UserEntity;

  source: string;

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
      new DemandBumpedEvent({
        id: input.id,
        demandId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
      }),
    );
    this.bumpedAt = new Date();
    this.price = input.newPrice;
  }
}
