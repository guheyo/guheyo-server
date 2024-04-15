import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface TagLoadPort extends LoadPort<TagEntity> {}
