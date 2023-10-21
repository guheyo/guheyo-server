import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateSwapProps } from './swap.types';
import { SwapCreatedEvent } from '../application/events/swap-created/swap-created.event';
import { SwapUpdatedEvent } from '../application/events/swap-updated/swap-updated.event';

export class SwapEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  price: number;

  priceCurrency: string;

  name0: string;

  name1: string;

  description0: string | null;

  description1: string | null;

  businessFunction: string;

  status: string;

  guildId: string;

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

  update(props: UpdateSwapProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new SwapUpdatedEvent(this.id));
  }
}
