import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface DemandLoadPort extends LoadPort<DemandEntity> {}
