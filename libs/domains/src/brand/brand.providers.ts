import { BrandRepository } from './adapter/out/persistence/brand.repository';
import { BRAND_QUERY_PROVIDERS } from './application/queries/brand.query.providers';

export const BRAND_PROVIDERS = [
  {
    provide: 'BrandLoadPort',
    useClass: BrandRepository,
  },
  {
    provide: 'BrandSavePort',
    useClass: BrandRepository,
  },
  ...BRAND_QUERY_PROVIDERS,
];
