import { ObjectType } from '@nestjs/graphql';
import { ProductBaseResponse } from './product-base.response';

@ObjectType()
export class ProductPreviewResponse extends ProductBaseResponse {
  // TODO: brand
  // TODO: thumbnail

  constructor(partial: Partial<ProductPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
