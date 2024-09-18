import { PlatformEntity } from '@lib/domains/platform/domain/platform.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface PlatformSavePort extends SavePort<PlatformEntity> {}
