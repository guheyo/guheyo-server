import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { AuctionPreviewResponse } from '../../dtos/auction-preview.response';

@ObjectType()
export class PaginatedAuctionPreviewsResponse extends paginated<AuctionPreviewResponse>(
  AuctionPreviewResponse,
) {}
