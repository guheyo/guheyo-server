import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateDemandProps } from './demand.types';
import { DemandCreatedEvent } from '../application/events/demand-created/demand-created.event';
import { DemandUpdatedEvent } from '../application/events/demand-updated/demand-updated.event';

export class DemandEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  description: string | null;

  price: number;

  priceCurrency: string;

  businessFunction: string;

  status: string;

  guildId: string;

  brandId: string | null;

  productCategoryId: string;

  buyerId: string;

  buyer: UserEntity;

  constructor(partial: Partial<DemandEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new DemandCreatedEvent(this.id));
  }

  update(props: UpdateDemandProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new DemandUpdatedEvent(this.id));
  }
}
