import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { Type } from 'class-transformer';

export class BidEntity {
  id: string;

  createdAt: Date;

  canceledAt: Date;

  price: number;

  priceCurrency: string;

  auctionId: string;

  userId: string;

  @Type(() => UserEntity)
  user: UserEntity;

  status: string;

  constructor(partial: Partial<BidEntity>) {
    Object.assign(this, partial);
  }
}
