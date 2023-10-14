import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UpdateAuctionProps } from './auction.types';
import { AuctionCreatedEvent } from '../application/events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../application/events/auction-updated/auction-updated.event';
import { BidEntity } from './bid.entity';
import { AddBidInput } from '../application/commands/add-bid/add-bid.input';
import { AuctionErrorMessage } from './auction.error.message';

export class AuctionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  endedAt: Date;

  name: string;

  description: string | null;

  businessFunction: string;

  status: string;

  guildId: string;

  brandId: string | null;

  productCategoryId: string;

  sellerId: string;

  seller: UserEntity;

  bids: BidEntity[];

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

  addBid(input: AddBidInput) {
    const bid = new BidEntity({
      ...input,
      status: '',
    });
    if (this.isBidBelowTheCurrentPrice(bid.price))
      throw new Error(AuctionErrorMessage.BID_BELOW_THE_CURRENT_PRICE);
    if (this.isCanceler(bid.bidderId))
      throw new Error(AuctionErrorMessage.CANCELLERS_ATTEMPT_TO_RE_BID);
    this.bids.push(bid);
  }

  getLastBid(): BidEntity {
    const lastBid = this.bids.at(-1);
    if (!lastBid) throw new Error(AuctionErrorMessage.BID_IS_NOT_FOUND);
    return lastBid;
  }

  isBidBelowTheCurrentPrice(price: number) {
    return this.bids ? price <= (this.bids.at(-1)?.price || 0) : price <= 0;
  }

  isCanceler(bidderId: string) {
    return this.bids.some((bid) => bid.canceledAt && bid.bidderId === bidderId);
  }
}
