import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { SwapResponse } from '../../dtos/swap.response';

@ObjectType()
export class PaginatedSwapsResponse extends paginated<SwapResponse>(SwapResponse) {}
