import { MannerTagEntity } from '@lib/domains/manner-tag/domain/manner-tag.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface MannerTagSavePort extends SavePort<MannerTagEntity> {}
