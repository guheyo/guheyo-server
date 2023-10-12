import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface DemandSavePort extends SavePort<DemandEntity> {}
