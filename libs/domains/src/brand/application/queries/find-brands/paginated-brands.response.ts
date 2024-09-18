import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { BrandResponse } from '../../dtos/brand.response';

@ObjectType()
export class PaginatedBrandsResponse extends paginated<BrandResponse>(BrandResponse) {}
