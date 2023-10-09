import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateOfferProps } from './offer.types';
import { OfferCreatedEvent } from '../application/events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../application/events/offer-updated/offer-updated.event';

export class OfferEntity extends AggregateRoot {
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

  sellerId: string;

  seller: UserEntity;

  constructor(partial: Partial<OfferEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new OfferCreatedEvent(this.id));
  }

  update(props: UpdateOfferProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new OfferUpdatedEvent(this.id));
  }
}
