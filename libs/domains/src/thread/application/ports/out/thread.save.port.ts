import { ThreadEntity } from '@lib/domains/thread/domain/thread.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ThreadSavePort extends SavePort<ThreadEntity> {}
