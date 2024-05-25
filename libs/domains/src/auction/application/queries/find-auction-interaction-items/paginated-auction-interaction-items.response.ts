import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import {
  AUCTION_INTERACTION_ITEM_UNION_NAME,
  AuctionInteractionItemUnion,
} from '../../dtos/auction-interaction-item.response';

@ObjectType()
export class PaginatedAuctionInteractionItemsResponse extends paginated<
  typeof AuctionInteractionItemUnion
>(AuctionInteractionItemUnion, AUCTION_INTERACTION_ITEM_UNION_NAME) {}
