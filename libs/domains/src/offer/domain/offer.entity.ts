import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateOfferProps } from './offer.types';

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

  updateOffer(props: UpdateOfferProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
