import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class BidEntity {
  id: string;

  createdAt: string;

  canceledAt: string;

  price: number;

  priceCurrency: string;

  auctionId: string;

  bidderId: string;

  bidder: UserEntity;

  status: string;

  constructor(partial: Partial<BidEntity>) {
    Object.assign(this, partial);
  }
}
