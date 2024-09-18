import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface BrandLoadPort extends LoadPort<BrandEntity> {}
