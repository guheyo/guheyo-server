import { EventBridgeService } from '@lib/shared/aws/event-bridge/event-bridge.service';
import { LambdaService } from '@lib/shared/aws/lambda/lambda.service';
import { AuctionRepository } from './adapter/out/persistence/auction.repository';
import { AUCTION_COMMAND_PROVIDERS } from './application/commands/auction.command.providers';
import { AUCTION_QUERY_PROVIDERS } from './application/queries/auction.query.providers';
import { AUCTION_EVENT_PROVIDERS } from './application/events/auction.event.providers';
import { AuctionSagas } from './application/sagas/auction.sagas';
import { AUCTION_SERVICES } from './application/services/auction.services';

export const AUCTION_PROVIDERS = [
  {
    provide: 'AuctionLoadPort',
    useClass: AuctionRepository,
  },
  {
    provide: 'AuctionSavePort',
    useClass: AuctionRepository,
  },
  {
    provide: 'BidSavePort',
    useClass: AuctionRepository,
  },
  ...AUCTION_COMMAND_PROVIDERS,
  ...AUCTION_QUERY_PROVIDERS,
  ...AUCTION_EVENT_PROVIDERS,
  ...AUCTION_SERVICES,
  AuctionSagas,
  EventBridgeService,
  LambdaService,
];
