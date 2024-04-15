import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface TagSavePort extends SavePort<TagEntity> {}
