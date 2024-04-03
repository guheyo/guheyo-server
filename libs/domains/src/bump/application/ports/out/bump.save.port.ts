import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface BumpSavePort extends SavePort<BumpEntity> {}
