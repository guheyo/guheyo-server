import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import dayjs from 'dayjs';
import { UpdateOfferProps } from './offer.types';
import { OfferCreatedEvent } from '../application/events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../application/events/offer-updated/offer-updated.event';
import { OfferBumpEntity } from './offer-bump.entity';
import { BumpOfferInput } from '../application/commands/bump-offer/bump-offer.input';
import { OfferBumpedEvent } from '../application/events/offer-bumped/offer-bumped.event';

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

  bumps: OfferBumpEntity[];

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
    return dayjs().diff(this.bumpedAt, 'd', true) > 1;
  }

  bump(input: BumpOfferInput) {
    this.bumpedAt = new Date();
    const oldData = {
      priceCurrency: this.priceCurrency,
      price: this.price,
    };
    this.apply(
      new OfferBumpedEvent({
        id: input.id,
        offerId: this.id,
        oldData,
        newData: input.newData,
      }),
    );
  }
}
