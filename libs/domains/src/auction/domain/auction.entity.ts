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
import { BID } from './bid.constants';
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

  content: string | null;

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
    this.extendedEndDate = this.originalEndDate;
  }

  create(tagIds: string[]) {
    this.apply(
      new AuctionCreatedEvent({
        id: this.id,
        postId: this.post.id,
        tagIds,
      }),
    );
  }

  update(props: UpdateAuctionProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(new AuctionUpdatedEvent(this.id));
  }

  addBid(command: AddBidCommand) {
    const bid = new BidEntity({
      ...pick(command, ['id', 'auctionId', 'price', 'priceCurrency']),
      userId: command.user.id,
      status: BID,
    });
    if (this.isBidBelowTheCurrentPrice(bid.price))
      throw new Error(AuctionErrorMessage.BID_BELOW_THE_CURRENT_PRICE);
    if (this.isCanceler(bid.userId))
      throw new Error(AuctionErrorMessage.CANCELLERS_ATTEMPT_TO_RE_BID);
    this.bids.push(bid);
  }

  cancelBid(command: CancelBidCommand): BidEntity {
    if (this.hasEnded()) throw new Error(AuctionErrorMessage.AUCTION_HAS_ENDED);

    const userBids = this.bids.filter((bid) => bid.userId === command.user.id);
    if (userBids.length === 0) throw new Error(AuctionErrorMessage.BID_NOT_FOUND);

    const lastBid = userBids[userBids.length - 1];

    if (this.cancellationTimeout(lastBid.createdAt))
      throw new Error(AuctionErrorMessage.BID_CANCELLATION_TIMEOUT);

    lastBid.canceledAt = new Date();
    return lastBid;
  }

  getLastBid(): BidEntity | null {
    const lastBid = this.bids.at(-1);
    return lastBid || null;
  }

  hasEnded() {
    return this.status === AUCTION_CLOSED;
  }

  isBidBelowTheCurrentPrice(price: number) {
    return price <= (this.getLastBid()?.price || 0);
  }

  isCanceler(bidderId: string) {
    return this.bids.some((bid) => bid.canceledAt && bid.userId === bidderId);
  }

  cancellationTimeout(createdAt: Date) {
    return dayjs().diff(createdAt, 'minutes') > 10;
  }
}
