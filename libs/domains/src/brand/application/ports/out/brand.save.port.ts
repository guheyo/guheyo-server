import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface BrandSavePort extends SavePort<BrandEntity> {}
