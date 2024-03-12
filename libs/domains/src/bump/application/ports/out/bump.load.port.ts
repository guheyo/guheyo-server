import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface BumpLoadPort extends LoadPort<BumpEntity> {}
