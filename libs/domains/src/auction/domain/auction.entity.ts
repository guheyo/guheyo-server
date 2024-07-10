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
import { BID } from './bid.constants';
import { PlaceBidCommand } from '../application/commands/place-bid/place-bid.command';
import { BidPlacedEvent } from '../application/events/bid-placed/bid-placed.event';
import { AuctionExtendedEvent } from '../application/events/auction-extended/auction-extended.event';

export class AuctionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  originalEndDate: Date;

  extendedEndDate: Date;

  version: number;

  postId: string;

  @Type(() => PostEntity)
  post: PostEntity;

  content: string | null;

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

  create(tagIds: string[]) {
    this.apply(
      new AuctionCreatedEvent({
        id: this.id,
        username: this.post.user.username,
        avatarURL: this.post.user.avatarURL || undefined,
        title: this.post.title,
        postId: this.post.id,
        thumbnail: this.post.thumbnail || undefined,
        tagIds,
        createdAt: this.createdAt,
        extendedEndDate: this.extendedEndDate,
        slug: this.post.slug || undefined,
        userAgent: this.post.userAgent || undefined,
      }),
    );
  }

  update(props: UpdateAuctionProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(
      new AuctionUpdatedEvent({
        auctionId: this.id,
        postId: this.post.id,
      }),
    );
  }

  placeBid(command: PlaceBidCommand): BidEntity {
    if (this.isClosed()) throw new Error(AuctionErrorMessage.AUCTION_CLOSED);

    const bid = new BidEntity({
      ...pick(command, ['id', 'auctionId', 'price', 'priceCurrency', 'userAgent', 'ipAddress']),
      userId: command.user.id,
      status: BID,
    });
    if (this.isBidBelowTheCurrentPrice(bid.price))
      throw new Error(AuctionErrorMessage.BID_BELOW_THE_CURRENT_PRICE);
    if (this.isCanceler(bid.userId))
      throw new Error(AuctionErrorMessage.CANCELLERS_ATTEMPT_TO_RE_BID);
    this.bids.push(bid);
    this.apply(
      new BidPlacedEvent({
        auctionId: this.id,
        bidId: bid.id,
      }),
    );
    return bid;
  }

  cancelBid({ userId, bidId }: { userId: string; bidId: string }): BidEntity {
    if (this.isClosed()) throw new Error(AuctionErrorMessage.AUCTION_CLOSED);

    const userBids = this.bids.filter((bid) => bid.userId === userId);
    if (userBids.length === 0) throw new Error(AuctionErrorMessage.BID_NOT_FOUND);

    const lastBid = userBids[userBids.length - 1];

    if (this.cancellationTimeout(lastBid.createdAt))
      throw new Error(AuctionErrorMessage.BID_CANCELLATION_TIMEOUT);
    if (lastBid.id !== bidId)
      throw new Error(AuctionErrorMessage.BID_CANCELLATION_TARGET_IS_NOT_A_RECENT_BID);

    lastBid.canceledAt = new Date();
    return lastBid;
  }

  getLastBid(): BidEntity | null {
    const lastBid = this.bids.filter((bid) => bid.canceledAt === null).at(-1);
    return lastBid || null;
  }

  isClosed() {
    const now = dayjs();
    return now.isAfter(dayjs(this.extendedEndDate));
  }

  isBidBelowTheCurrentPrice(price: number) {
    return price <= (this.getLastBid()?.price || 0);
  }

  isSeller(userId: string) {
    return this.post.userId === userId;
  }

  isCanceler(bidderId: string) {
    return this.bids.some((bid) => bid.canceledAt && bid.userId === bidderId);
  }

  cancellationTimeout(createdAt: Date) {
    return dayjs().diff(createdAt, 'seconds') > 30;
  }

  calculateRemainingMilliseconds() {
    const now = new Date();
    return this.extendedEndDate.getTime() - now.getTime();
  }

  isEndWithinLastMinute() {
    return this.calculateRemainingMilliseconds() < 60000;
  }

  extendEndDateByOneMinute() {
    this.extendedEndDate = new Date(new Date().getTime() + 60000);
    this.apply(
      new AuctionExtendedEvent({
        auctionId: this.id,
      }),
    );
    return this.extendedEndDate;
  }
}
