import { MannerTagEntity } from '@lib/domains/manner-tag/domain/manner-tag.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface MannerTagLoadPort extends LoadPort<MannerTagEntity> {}
