import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ProductPreviewResponse } from '../../dtos/product-preview.response';

@ObjectType()
export class PaginatedProductsResponse extends paginated<ProductPreviewResponse>(
  ProductPreviewResponse,
) {}
