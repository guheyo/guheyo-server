import { ProductRepository } from './adapter/out/persistence/product.repository';
import { PRODUCT_COMMAND_PROVIDERS } from './application/commands/product.command.providers';
import { PRODUCT_QUERY_PROVIDERS } from './application/queries/product.query.providers';

export const PRODUCT_PROVIDERS = [
  {
    provide: 'ProductLoadPort',
    useClass: ProductRepository,
  },
  {
    provide: 'ProductSavePort',
    useClass: ProductRepository,
  },
  ...PRODUCT_QUERY_PROVIDERS,
  ...PRODUCT_COMMAND_PROVIDERS,
];
