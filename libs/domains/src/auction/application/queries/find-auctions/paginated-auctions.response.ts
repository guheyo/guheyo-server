import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { AuctionResponse } from '../../dtos/auction.response';

@ObjectType()
export class PaginatedAuctionsResponse extends paginated<AuctionResponse>(AuctionResponse) {}
