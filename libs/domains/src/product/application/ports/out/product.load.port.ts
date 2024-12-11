import { ProductEntity } from '@lib/domains/product/domain/product.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ProductLoadPort extends LoadPort<ProductEntity> {}
