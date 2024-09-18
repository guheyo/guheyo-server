import { PlatformEntity } from '@lib/domains/platform/domain/platform.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface PlatformLoadPort extends LoadPort<PlatformEntity> {}
