import { AggregateRoot } from '@nestjs/cqrs';
import dayjs from 'dayjs';
import { isUndefined, omitBy, pick } from 'lodash';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { UpdateAuctionProps } from './auction.types';
import { AuctionCreatedEvent } from '../application/events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../application/events/auction-updated/auction-updated.event';
import { BidEntity } from './bid.entity';
import { AuctionErrorMessage } from './auction.error.message';
import { CancelBidCommand } from '../application/commands/cancel-bid/cancel-bid.command';
import { AUCTION_CLOSED } from './auction.constants';
import { BID_BID } from './bid.constants';
import { AddBidCommand } from '../application/commands/add-bid/add-bid.command';

export class AuctionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  originalEndDate: Date;

  extendedEndDate: Date;

  extensionCount: number;

  postId: string;

  @Type(() => PostEntity)
  post: PostEntity;

  currentBidPrice: number;

  hammerPrice: number;

  shippingCost: number;

  shippingType: string;

  status: string;

  @Type(() => BidEntity)
  bids: BidEntity[];

  constructor(partial: Partial<AuctionEntity>) {
    super();
    Object.assign(this, partial);
  }

  create() {
    this.apply(new AuctionCreatedEvent(this.id));
  }

  update(props: UpdateAuctionProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(new AuctionUpdatedEvent(this.id));
  }

  addBid(command: AddBidCommand) {
    const bid = new BidEntity({
      ...pick(command, ['id', 'auctionId', 'price', 'priceCurrency']),
      userId: command.user.id,
      status: BID_BID,
    });
    if (this.isBidBelowTheCurrentPrice(bid.price))
      throw new Error(AuctionErrorMessage.BID_BELOW_THE_CURRENT_PRICE);
    if (this.isCanceler(bid.userId))
      throw new Error(AuctionErrorMessage.CANCELLERS_ATTEMPT_TO_RE_BID);
    this.bids.push(bid);
  }

  cancelBid(command: CancelBidCommand): BidEntity {
    if (this.hasClosed()) throw new Error(AuctionErrorMessage.AUCTION_HAS_ENDED);

    const bidToBeCanceled = this.bids.find((bid) => bid.userId === command.user.id);
    if (!bidToBeCanceled) throw new Error(AuctionErrorMessage.BID_NOT_FOUND);

    if (this.cancellationTimeout(bidToBeCanceled.createdAt))
      throw new Error(AuctionErrorMessage.BID_CANCELLATION_TIMEOUT);

    bidToBeCanceled.canceledAt = new Date();
    return bidToBeCanceled;
  }

  getLastBid(): BidEntity {
    const lastBid = this.bids.at(-1);
    if (!lastBid) throw new Error(AuctionErrorMessage.BID_NOT_FOUND);
    return lastBid;
  }

  hasClosed() {
    return this.status === AUCTION_CLOSED;
  }

  isBidBelowTheCurrentPrice(price: number) {
    return this.bids ? price <= (this.bids.at(-1)?.price || 0) : price <= 0;
  }

  isCanceler(bidderId: string) {
    return this.bids.some((bid) => bid.canceledAt && bid.userId === bidderId);
  }

  cancellationTimeout(createdAt: Date) {
    return dayjs().diff(createdAt, 'minutes') > 10;
  }
}
