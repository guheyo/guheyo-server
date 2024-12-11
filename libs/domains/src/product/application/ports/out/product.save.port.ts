import { ProductEntity } from '@lib/domains/product/domain/product.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ProductSavePort extends SavePort<ProductEntity> {}
