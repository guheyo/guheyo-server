import { FindProductPreviewHandler } from './find-product-preview/find-product-preview.handler';
import { FindProductHandler } from './find-product/find-product.handler';
import { FindProductsHandler } from './find-products/find-products.handler';

export const PRODUCT_QUERY_PROVIDERS = [
  FindProductHandler,
  FindProductPreviewHandler,
  FindProductsHandler,
];
