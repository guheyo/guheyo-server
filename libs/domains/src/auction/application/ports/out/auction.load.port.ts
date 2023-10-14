import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface AuctionLoadPort extends LoadPort<AuctionEntity> {}
