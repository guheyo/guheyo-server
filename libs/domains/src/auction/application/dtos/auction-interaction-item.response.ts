import { createUnionType } from '@nestjs/graphql';
import { CommentWithAuthorResponse } from '@lib/domains/comment/application/dtos/comment-with-author.response';
import { BidResponse } from './bid.response';

export const AUCTION_INTERACTION_ITEM_UNION_NAME = 'AuctionInteractionItemResponse';

export const AuctionInteractionItemUnion = createUnionType({
  name: AUCTION_INTERACTION_ITEM_UNION_NAME,
  types: () => [BidResponse, CommentWithAuthorResponse] as const,
  resolveType(value) {
    if ('price' in value) {
      return BidResponse;
    }
    if ('content' in value) {
      return CommentWithAuthorResponse;
    }
    return null;
  },
});
