import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { OfferResponse } from '../../dtos/offer.response';

@ObjectType()
export class PaginatedOffersResponse extends paginated<OfferResponse>(OfferResponse) {}
