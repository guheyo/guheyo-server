import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface VersionLoadPort extends LoadPort<VersionEntity> {}
