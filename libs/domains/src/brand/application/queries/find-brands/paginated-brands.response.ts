import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { BrandPreviewResponse } from '../../dtos/brand-preview.response';

@ObjectType()
export class PaginatedBrandsResponse extends paginated<BrandPreviewResponse>(
  BrandPreviewResponse,
) {}
