import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateAuctionProps } from './auction.types';
import { AuctionCreatedEvent } from '../application/events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../application/events/auction-updated/auction-updated.event';

export class AuctionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  endedAt: Date;

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

  constructor(partial: Partial<AuctionEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new AuctionCreatedEvent(this.id));
  }

  update(props: UpdateAuctionProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new AuctionUpdatedEvent(this.id));
  }
}
