import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { BidResponse } from '../../dtos/bid.response';

@ObjectType()
export class PaginatedBidsResponse extends paginated<BidResponse>(BidResponse) {}
