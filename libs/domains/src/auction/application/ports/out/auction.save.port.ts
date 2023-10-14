import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface AuctionSavePort extends SavePort<AuctionEntity> {}
