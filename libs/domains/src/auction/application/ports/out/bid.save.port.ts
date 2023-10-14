import { BidEntity } from '@lib/domains/auction/domain/bid.entity';

export interface BidSavePort {
  addBid(bid: BidEntity): Promise<void>;
  cancelBid(bid: BidEntity): Promise<void>;
}
