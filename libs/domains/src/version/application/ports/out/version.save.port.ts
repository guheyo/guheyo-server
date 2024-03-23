import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface VersionSavePort extends SavePort<VersionEntity> {}
