import { FindBrandPreviewHandler } from './find-brand-preview/find-brand-preview.handler';
import { FindBrandHandler } from './find-brand/find-brand.handler';
import { FindBrandsHandler } from './find-brands/find-brands.handler';

export const BRAND_QUERY_PROVIDERS = [FindBrandHandler, FindBrandsHandler, FindBrandPreviewHandler];
