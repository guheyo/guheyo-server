import { ObjectType } from '@nestjs/graphql';
import { ProductPreviewResponse } from './product-preview.response';

@ObjectType()
export class ProductDetailResponse extends ProductPreviewResponse {
  // TODO: images
  // TODO: reviews

  constructor(partial: Partial<ProductDetailResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
