import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import dayjs from 'dayjs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateAuctionProps } from './auction.types';
import { AuctionCreatedEvent } from '../application/events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../application/events/auction-updated/auction-updated.event';
import { BidEntity } from './bid.entity';
import { AddBidInput } from '../application/commands/add-bid/add-bid.input';
import { AuctionErrorMessage } from './auction.error.message';
import { CancelBidCommand } from '../application/commands/cancel-bid/cancel-bid.command';
import { AUCTION_CLOSED, AUCTION_OPEN } from './auction.constants';
import { BID_BID } from './bid.constants';

export class AuctionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  endedAt: Date;

  name: string;

  description: string | null;

  businessFunction: string;

  status: string;

  pending?: string;

  groupId: string;

  brandId: string | null;

  productCategoryId: string;

  sellerId: string;

  seller: UserEntity;

  bids: BidEntity[];

  source: string;

  constructor(partial: Partial<AuctionEntity>) {
    super();
    Object.assign(this, partial);
    this.status = AUCTION_OPEN;
  }

  create() {
    this.apply(new AuctionCreatedEvent(this.id));
  }

  update(props: UpdateAuctionProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(new AuctionUpdatedEvent(this.id));
  }

  addBid(input: AddBidInput) {
    const bid = new BidEntity({
      ...input,
      status: BID_BID,
    });
    if (this.isBidBelowTheCurrentPrice(bid.price))
      throw new Error(AuctionErrorMessage.BID_BELOW_THE_CURRENT_PRICE);
    if (this.isCanceler(bid.bidderId))
      throw new Error(AuctionErrorMessage.CANCELLERS_ATTEMPT_TO_RE_BID);
    this.bids.push(bid);
  }

  cancelBid(input: CancelBidCommand): BidEntity {
    if (this.hasClosed()) throw new Error(AuctionErrorMessage.AUCTION_HAS_ENDED);

    const bidToBeCanceled = this.bids.find((bid) => bid.bidderId === input.bidderId);
    if (!bidToBeCanceled) throw new Error(AuctionErrorMessage.BID_IS_NOT_FOUND);

    if (this.cancellationTimeout(bidToBeCanceled.createdAt))
      throw new Error(AuctionErrorMessage.BID_CANCELLATION_TIMEOUT);

    bidToBeCanceled.canceledAt = new Date();
    return bidToBeCanceled;
  }

  getLastBid(): BidEntity {
    const lastBid = this.bids.at(-1);
    if (!lastBid) throw new Error(AuctionErrorMessage.BID_IS_NOT_FOUND);
    return lastBid;
  }

  hasClosed() {
    return this.status === AUCTION_CLOSED;
  }

  isBidBelowTheCurrentPrice(price: number) {
    return this.bids ? price <= (this.bids.at(-1)?.price || 0) : price <= 0;
  }

  isCanceler(bidderId: string) {
    return this.bids.some((bid) => bid.canceledAt && bid.bidderId === bidderId);
  }

  cancellationTimeout(createdAt: Date) {
    return dayjs().diff(createdAt, 'minutes') > 10;
  }
}
